import GroupApi from '@/api/groups.api';
import type { Group } from '@/types/group';
import { defineStore } from 'pinia';

export type Nullable<T> = T | null;

export interface GroupState {
  groups: Group[];
  group?: Nullable<Group>;
}

export const useGroupStore = defineStore({
  id: 'groups',

  state: (): GroupState => ({
    group: null,
    groups: []
  }),

  actions: {
    async findAll() {
      this.groups = await GroupApi.findAll();
    },

    async findOne(id: number) {
      this.group = await GroupApi.findOne(id);
    },

    async create(name: string) {
      const group = await GroupApi.create(name);
      this.groups.push(group);
      return group;
    }
  }
});
