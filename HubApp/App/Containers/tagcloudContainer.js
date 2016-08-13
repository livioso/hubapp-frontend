import { connect } from 'react-redux';
import { TagCloud } from '../Components/tagcloud';
import Immutable from 'immutable';

export default connect(
  (state) => {
    const skillList = countList(state.members.data.list)
      .sortBy(o => o.count)
      .takeLast(20)
      .sortBy(o => o.skill.name);
    return {
      skillList,
      min: Math.log(skillList.minBy(o => o.count).count),
      max: Math.log(skillList.maxBy(o => o.count).count),
    };
  }
)(TagCloud);

const countList = members => {
  const immutableMembers = Immutable.List(members);
  return immutableMembers
    .map(m => Immutable.List(m.skills))
    .flatten()
    .groupBy(s => s.id)
    .map(l => ({ skill: l.first(), count: l.count() }));
};
