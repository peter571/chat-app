import { appApi } from "./api";

const messageApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    newMessage: build.mutation({
      query: (body) => ({
        url: "/messages/new-message",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Messages"],
    }),
    getMessages: build.query({
      query: (chat_id) => `/messages/${chat_id}`,
      providesTags: ["Messages"],
    }),
    deleteMessage: build.mutation({
      query: ({ chatId, messageId }) => ({
        url: `/messages/delete-message/${chatId}/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
    editMessage: build.mutation({
      query: ({ chatId, messageId, textMsg }) => ({
        url: `/messages/edit-message/${chatId}/${messageId}`,
        method: "PATCH",
        body: { content: textMsg },
      }),
      invalidatesTags: ["Messages"]
    }),
  }),
});

export const {
  useNewMessageMutation,
  useGetMessagesQuery,
  useDeleteMessageMutation,
  useEditMessageMutation
} = messageApi;
