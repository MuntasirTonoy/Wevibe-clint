import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";

const fetchComments = async (eventId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/events/${eventId}/comments`
  );
  return res.data;
};

const postComment = async ({ eventId, comment }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/events/${eventId}/comments`,
    comment
  );
  return res.data;
};

const deleteComment = async ({ commentId, email }) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}?email=${email}`
  );
  return res.data;
};

const Comments = ({ eventId }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", eventId],
    queryFn: () => fetchComments(eventId),
    enabled: !!eventId,
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries(["comments", eventId]);
    },
    onError: () => {
      swal.fire("Error", "Failed to post comment", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", eventId]);
      swal.fire("Deleted!", "Your comment has been deleted.", "success");
    },
    onError: (err) => {
      swal.fire(
        "Error",
        err.response?.data?.error || "Failed to delete comment",
        "error"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      return swal.fire("Login Required", "Please log in to comment", "warning");
    }
    if (!text.trim()) return;

    mutation.mutate({
      eventId,
      comment: {
        author: {
          name: user.displayName || "Anonymous",
          email: user.email,
          avatar: user.photoURL || `https://i.pravatar.cc/50?u=${user.email}`,
        },
        text,
      },
    });
  };

  const handleDelete = (commentId) => {
    if (!user) return;
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to recover this comment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate({ commentId, email: user.email });
        }
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-md resize-none"
          rows={3}
        ></textarea>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {mutation.isLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="border-b pb-2">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={c.author.avatar}
                  alt={c.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{c.author.name}</span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(c.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                {/* Delete button for author only */}
                {user?.email?.toLowerCase() ===
                  c.author.email?.toLowerCase() && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="ml-auto text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="text-sm">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
