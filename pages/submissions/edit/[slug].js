import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function EditOne() {
  const router = useRouter();
  const slug = router.query.slug;
  const [data, setData] = useState({});

  useEffect(() => {
    if (router.isReady) {
      fetch(`http://localhost:3004/submissions/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }
  }, [router.isReady]);

  const EditSubmission = async (event) => {
    event.preventDefault();
    let requestBody = {
      ...data,
    };

    try {
      await fetch(`http://localhost:3004/submissions/${slug}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then(() => {
        alert("Data Added Successfully");
        router.push(`/submissions/${slug}`);
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="bg-[#F8F9FD] px-32 py-4">
      <div className="w-full max-w-4xl">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={EditSubmission}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[706px]"
              id="title"
              type="text"
              placeholder="Title of Your Submission"
              required
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              for="body"
            >
              Summary
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[706px]"
              id="body"
              type="text"
              placeholder="A short summary of your submission (this will be visible with your submission)"
              required
              value={data.body}
              onChange={(e) => {
                setData({ ...data, body: e.target.value });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              for="description"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[706px]"
              placeholder="Write a long description of your project. You can describe your idea and approach here."
              required
              value={data.description}
              onChange={(e) => {
                setData({ ...data, description: e.target.value });
              }}
            />
          </div>

          <div className="flex  mb-4 flex-col">
            <label
              for="description"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Cover Image
            </label>
            <div className="rounded-lg shadow-md bg-gray-50 max-w-[706px] w-full">
              <div className="m-4">
                <label className="inline-block mb-2 text-gray-500">
                  Minimum resolution: 360px X 360px
                </label>
                <div className="flex items-center justify-center w-full max-w-[706px]">
                  <label className="flex flex-col w-full h-20 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex justify-between px-4  pt-7 relative overflow-hidden h-[60px] w-[60px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600 "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <Image
                        src={data.pic}
                        alt={data.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <input
                      type="file"
                      className="opacity-0"
                      src={data.pic}
                      onChange={(e) => {
                        setData({
                          ...data,
                          pic: URL.createObjectURL(e.target.files[0]),
                        });
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              for="hName"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Hackathon Name
            </label>
            <input
              id="hName"
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[706px]"
              placeholder="Enter the name of the hackathon."
              required
              value={data.hName}
              onChange={(e) => {
                setData({ ...data, hName: e.target.value });
              }}
            />
          </div>
          <div className="mb-4 flex items-center  gap-6 flex-wrap">
            <div className="">
              <label
                for="date"
                className="block text-gray-700 text-lg font-bold mb-2"
              >
                Hackathon Start Date
              </label>
              <input
                id="date"
                type="date"
                className="shadow appearance-none border rounded w-[337px] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[337px]"
                placeholder="Select start date"
                required
                value={data.date}
                onChange={(e) => {
                  setData({ ...data, date: e.target.value });
                }}
              />
            </div>
            <div className="">
              <label
                for="end"
                className="block text-gray-700 text-lg font-bold mb-2"
              >
                Hackathon End Date
              </label>
              <input
                id="end"
                type="date"
                className="shadow appearance-none border rounded w-[337px] py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[337px]"
                placeholder="Select end date"
                required
                value={data.end}
                onChange={(e) => {
                  setData({ ...data, end: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              for="github"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              GitHub Repository
            </label>
            <input
              id="github"
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[706px]"
              placeholder="Enter your submission’s public GitHub repository link"
              required
              value={data.github}
              onChange={(e) => {
                setData({ ...data, github: e.target.value });
              }}
            />
          </div>
          <div className="mb-4 ">
            <label
              for="other"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Other Links
            </label>
            <input
              id="other"
              type="text"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[706px]"
              placeholder="You can upload a video demo or URL of you demo app here."
              value={data.other}
              onChange={(e) => {
                setData({ ...data, other: e.target.value });
              }}
            />
          </div>
          <div className="mb-4 mt-12 border-t-[1px] border-gray-300 w-full max-w-[706px] py-8">
            <button
              className="bg-[#44924C] py-3 px-[18px] rounded-[10px] w-[192px] h-[52px] text-white font-semibold "
              type="submit"
            >
              Update Submission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
