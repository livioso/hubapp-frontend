import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MemberList } from '../Components/memberList';
import * as memberListActions from '../Actions/memberListActions';
import Immutable from 'immutable';

import {
  filterMembersByFullWordMatch,
  filterMembersByPartialWordMatch,
  filterMembersBySmartSearch,
  availableFilters
} from '../Reducers/memberListReducer';

export default connect(
  // which part of the Redux global state does
  // our component want to receive as props?
  (state) => {
    const { globalNav: navigation, members } = state;

    // destruct the slightly
    // complicated state :)
    const {
      data: { list },
      search: { text: searchText, suggestions },
      filter
    } = members;

    const allMember = list.map((member) => {
      return {
        ...member,
        category: member.lastname.charAt(0).toUpperCase(),
      };
    });

    const { colab, viadukt, garage, collaboration } = availableFilters;

    // FIXME (livioso 07.22.2016) Horrific naming => Please fix me.
    // And some eslint errors as well. :(
    const containsLocation = filter.active.includes(colab.identifier) || filter.active.includes(viadukt.identifier) || filter.active.includes(garage.identifier);

    const _colab = m => (filter.active.includes(colab.identifier) && colab.filter(m));
    const _viadukt = m => (filter.active.includes(viadukt.identifier) && viadukt.filter(m));
    const _garage = m => (filter.active.includes(garage.identifier) && garage.filter(m));

    const isColab = m => (!filter.active.includes(collaboration.identifier) || filter.active.includes(collaboration.identifier) && collaboration.filter(m));
    const isAny = m => containsLocation ? (_colab(m) || _viadukt(m) || _garage(m)) : true;

    const filteredMembers = allMember.filter(m => isAny(m)).filter(m => isColab(m));
// debugger;
    // get results for searches
    const fulltextSearch =
      Immutable.Set(filterMembersByFullWordMatch(filteredMembers, searchText));

    const fullTextSearchPartial =
      Immutable.Set(filterMembersByPartialWordMatch(filteredMembers, searchText));

    const smartSearch =
      Immutable.Set(filterMembersBySmartSearch(filteredMembers, searchText, suggestions));

    // annotated the search results with
    // categories. Make sure to not do this
    // before comparing (e.g. has()).
    const smartSearchAnnotated = smartSearch
      .filter(member => !fulltextSearch.has(member))
      .filter(member => !fullTextSearchPartial.has(member))
      .map(member => {
        return { ...member, category: 'Good Matches' };
      });

    const fulltextSearchPartialMatch = fullTextSearchPartial
      .filter(member => !fulltextSearch.has(member))
      .map(member => {
        return { ...member, category: 'Good Matches' };
      });

    const fulltextSearchAnnotated = fulltextSearch
      .map(member => {
        return { ...member, category: 'Best Matches' };
      });

    // merge it all together :)
    const mergedGoodMatches = fulltextSearchPartialMatch.concat(smartSearchAnnotated);
    const mergedSearch = fulltextSearchAnnotated.concat(mergedGoodMatches);

    const membersWithSections = searchText !== ''
      ? mergedSearch.toJS()
      : filteredMembers;

    const membersWithSectionsGrouped = Immutable.Set(membersWithSections)
      .sortBy(member => member.lastname)
      .sortBy(member => {
        return -(Immutable.Set(member.skills.map(skill => skill.name))
          .intersect(suggestions)
          .count());
      })
      .sortBy(member => member.category)
      .groupBy(member => member.category)
      .toJS();

    return {
      members: membersWithSectionsGrouped,
      searchText,
      navigation
    };
  },

  // which action creators does
  // it want to receive by props?
  (dispatch) => {
    const {
      search
    } = bindActionCreators(memberListActions, dispatch);
    return {
      onSearch: search,
      dispatch
    };
  },

  (stateProps, dispatchProps, ownProps) => {
    return {
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onNavigate: (action) => {
        dispatchProps.dispatch({
          ...action,
          scope: action.scope || stateProps.navigation.key
        });
      }
    };
  }
)(MemberList);
