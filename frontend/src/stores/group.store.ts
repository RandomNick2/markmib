import GroupApi from '@/api/groups.api';
import type { Group } from '@/types/group';
import { defineStore } from 'pinia';

export type Nullable<T> = T | null;

export interface GroupState {
  groups: Group[];
  group?: Nullable<Group>;
  qualification?: { id: number; name: string }[];
  speciality?: { id: number; name: string }[];
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

    async create(name: string, qualificationId: number, specialityId: number) {
      const group = await GroupApi.create(name, qualificationId, specialityId);
      this.groups.push(group);
      return group;
    },

    async findQualification() {
      const response = await GroupApi.findQualification();
      this.qualification = response;
    },

    async findSpeciality() {
      const response = await GroupApi.findSpeciality();
      this.speciality = response;
    }
  }
});
