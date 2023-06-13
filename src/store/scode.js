import {getScodeInfo} from "@/api/getScode";

const state = {
  data: {},
};
const mutations = {
  GET_DATA(state, payload) {
    state.data = payload;
  },
};
const actions = {
  async getData(ctx, scode) {
    const result = await getScodeInfo(scode);
    ctx.commit("GET_DATA", result.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
