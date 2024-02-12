import { defineStore } from "pinia";
import { getGroups } from "@/http/groupApi";


export interface Group {
  id: number,
  name: string,
  users?: null
}

export interface GroupState {
  groups: Group[]
}

export interface GroupStore extends GroupState {
  getAllGroups: () => Promise<void>
}

export const useGroupStore = defineStore({
  id: 'group',

  state: (): GroupState => ({
    groups: []
  }),

  actions: {
    async getAllGroups() {
      this.groups = await getGroups()
    }
  }
})