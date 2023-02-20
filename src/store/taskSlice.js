import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};
const BASE_URL = "http://localhost:8000/tasks";

// git tasks
export const gitTasks = createAsyncThunk(
  "tasks/gitTasksFromServer",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return rejectWithValue({ error: "Not Task Found" });
    }
  }
);
// app task
export const addTask = createAsyncThunk(
  "tasks/addTaskToServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };
    const response = await fetch(BASE_URL, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return rejectWithValue({ error: "Task Not Added" });
    }
  }
);

// PATCH task
export const updateTask = createAsyncThunk(
  "tasks/updateTaskInServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return rejectWithValue({ error: "Task Not Updated" });
    }
  }
);
// DELETE task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTaskFromServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "DELETE",
    };
    const response = await fetch(BASE_URL + "/" + task.id, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return rejectWithValue({ error: "Task Not Delete" });
    }
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // addTaskToList: (state, action) => {
    //   const id = Math.random() * 100;
    //   const task = { ...action.payload, id };
    //   state.tasksList.push(task);
    // },
    removeTaskFormList: (state, action) => {
      state.tasksList = state.tasksList.filter(
        (task) => task.id !== action.payload.id
      );
    },
    // updateTaskToList: (state, action) => {
    //   state.tasksList = state.tasksList.map((task) =>
    //     task.id === action.payload.id ? action.payload : task
    //   );
    // },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // get task
      .addCase(gitTasks.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(gitTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      .addCase(gitTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })

      //add task
      .addCase(addTask.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      //updated task
      .addCase(updateTask.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      })
      //Delete  task
      .addCase(deleteTask.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = state.tasksList.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFormList,
  updateTaskToList,
  setSelectedTask,
} = taskSlice.actions;
export default taskSlice.reducer;
