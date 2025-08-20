export interface Store<T> {
  set(data: T, id?: string): Promise<void>;
  get(id: string): Promise<T | undefined>;
}

// type newTaskStore = Transformed<
//   Store<TaskAndHistory>,
//   {
//     set: "save";
//     get: "load";
//   }
// >;

// const newTaskStoreTest: newTaskStore = {
//   save: async (data, id) => {
//     console.log("save", data, id);
//   },
//   load: async (id) => {
//     console.log("load", id);
//     return null;
//   },
// };
