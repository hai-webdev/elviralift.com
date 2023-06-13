import getContent from "@/api/getContent";

const state = {
  data: {},
};
const mutations = {
  GET_DATA(state, payload) {
    state.data = payload;
  },
};
const actions = {
  async getData(ctx) {
    const result = await getContent({id:1});
    ctx.commit("GET_DATA", result.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
