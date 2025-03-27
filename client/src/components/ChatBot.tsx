/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useThemeStore } from "../utils/useThemeStore";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";

import axios from "axios";
import parse from "html-react-parser";
import { FaUser } from "react-icons/fa";

const ChatBot = () => {
  const themeStore = useThemeStore();
  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState<
    { text: string; sender: "start" | "end"; isLoading?: boolean }[]
  >([{ text: "Hello! How can I help you today?", sender: "start" }]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!data.user_prompt.trim()) return;

    const userMessage: {
      text: string;
      sender: "start" | "end";
      isLoading?: boolean;
    } = { text: data.user_prompt, sender: "end" };
    setMessages((prev) => [...prev, userMessage]); // Add user's message to the chat

    // Show loading skeleton while waiting for response
    setMessages((prev) => [
      ...prev,
      { text: "", sender: "start", isLoading: true },
    ]);

    try {
      const response = await axios.post(
        "http://localhost:5000/chatbot-google",
        {
          user_prompt: data.user_prompt,
        }
      );

      const aiResponse =
        response.data?.text || "I'm sorry, I didn't understand that.";

      // Replace the skeleton message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading ? { text: aiResponse, sender: "start" } : msg
        )
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? { text: "Error: Unable to fetch response.", sender: "start" }
            : msg
        )
      );
    }

    reset();
  };

  // const formatResponseToHTML = (response: string) => {
  //   let formattedText = response.replace(
  //     /\*\*(.*?)\*\*/g,
  //     "<strong>$1</strong>"
  //   );

  //   formattedText = formattedText
  //     .split("\n")
  //     .map((line) => `<p>${line.trim()}</p>`)
  //     .join("");

  //   return formattedText;
  // };

  return (
    <div className="drawer drawer-end z-100">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle bg-purple-500"
      />
      <div
        className={`fixed shadow-lg ${
          themeStore.darkMode ? "shadow-gray-700" : "shadow-gray-400"
        } bottom-10 right-10 rounded-full p-2 hover:bg-base-300 hover:cursor-pointer drawer-content`}
      >
        <label htmlFor="my-drawer-4" className="drawer-button">
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-10 h-10 hover:animate-spin hover:duration-300"
          >
            <path
              d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
              fill="url(#prefix__paint0_radial_980_20147)"
            />
            <defs>
              <radialGradient
                id="prefix__paint0_radial_980_20147"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
              >
                <stop offset=".067" stopColor="#9168C0" />
                <stop offset=".343" stopColor="#5684D1" />
                <stop offset=".672" stopColor="#1BA1E3" />
              </radialGradient>
            </defs>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-120 p-4 mr-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="chat-box overflow-y-auto h-200 p-2 pt-8 rounded">
              <h4 className="text-lg mb-10 flex items-center ">
                Ask Question to Gemini{" "}
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="w-8 h-8 hover:animate-spin hover:duration-300 "
                >
                  <path
                    d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                    fill="url(#prefix__paint0_radial_980_20147)"
                  />
                  <defs>
                    <radialGradient
                      id="prefix__paint0_radial_980_20147"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                    >
                      <stop offset=".067" stopColor="#9168C0" />
                      <stop offset=".343" stopColor="#5684D1" />
                      <stop offset=".672" stopColor="#1BA1E3" />
                    </radialGradient>
                  </defs>
                </svg>
              </h4>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat ${
                    message.sender === "start" ? "chat-start" : "chat-end"
                  }`}
                >
                  {message.sender === "start" && (
                    <div className="chat-image avatar">
                      <div className={`w-10 rounded-full mr-2`}>
                        <svg
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          className="w-10 h-10 hover:animate-spin hover:duration-300"
                        >
                          <path
                            d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                            fill="url(#prefix__paint0_radial_980_20147)"
                          />
                          <defs>
                            <radialGradient
                              id="prefix__paint0_radial_980_20147"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                            >
                              <stop offset=".067" stopColor="#9168C0" />
                              <stop offset=".343" stopColor="#5684D1" />
                              <stop offset=".672" stopColor="#1BA1E3" />
                            </radialGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  )}
                  {message.sender !== "start" && (
                    <div className="chat-image avatar">
                      <div className={` rounded-full ml-2`}>
                        <FaUser className="w-8 h-8 text-fuchsia-700" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`chat-bubble mb-2   ${
                      message.sender === "start"
                        ? "chat-bubble-primary w-auto"
                        : "chat-bubble-secondary"
                    }`}
                  >
                    {message.isLoading ? (
                      <>
                        <div className="chat-image avatar ">
                          <div className="w-10 rounded-full">
                            <svg
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              className="w-10 h-10 animate-spin duration-300"
                            >
                              <path
                                d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
                                fill="url(#prefix__paint0_radial_980_20147)"
                              />
                              <defs>
                                <radialGradient
                                  id="prefix__paint0_radial_980_20147"
                                  cx="0"
                                  cy="0"
                                  r="1"
                                  gradientUnits="userSpaceOnUse"
                                  gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
                                >
                                  <stop offset=".067" stopColor="#9168C0" />
                                  <stop offset=".343" stopColor="#5684D1" />
                                  <stop offset=".672" stopColor="#1BA1E3" />
                                </radialGradient>
                              </defs>
                            </svg>
                          </div>
                        </div>
                        <div className="chat-bubble w-auto h-auto chat-bubble-primary space-y-1">
                          <div role="status" className="max-w-sm animate-pulse">
                            <h3 className="h-3 bg-gray-300 rounded-full  w-48 mb-4"></h3>
                            <p className="h-2 bg-gray-300 rounded-full max-w-[380px] mb-2.5"></p>
                            <p className="h-2 bg-gray-300 rounded-full max-w-[340px] mb-2.5"></p>
                            <p className="h-2 bg-gray-300 rounded-full max-w-[320px] mb-2.5"></p>
                          </div>{" "}
                        </div>
                      </>
                    ) : (
                      <div>{parse(message.text)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center w-full">
              <div className="mt-4 w-full join">
                <input
                  type="text"
                  className="input join-item flex-grow"
                  placeholder="Type a message..."
                  {...register("user_prompt")}
                />
                <button className="btn btn-primary join-item" type="submit">
                  <IoSend />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
