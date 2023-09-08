import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function Submission() {
  const router = useRouter();
  const [found, setFound] = useState();
  const [showModal, setShowModal] = useState(false);
  const slug = router.query.slug;

  useEffect(() => {
    if (router.isReady) {
      fetch(`http://localhost:3004/submissions/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFound(data);
        });
    }
  }, [router.isReady]);

  const editTask = async (event) => {
    event.preventDefault();
    let updateObject = { ...found, type: !found.type };

    try {
      await fetch(`http://localhost:3004/submissions/${slug}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateObject),
      }).then(() => {
        if (found.type === true) {
          alert("Removed from Your Favourites Tab");
          window.location.reload(false);
        } else {
          alert("Added To Your Favourites Tab");
          window.location.reload(false);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTask = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3004/submissions/${slug}`, {
        method: "Delete",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(found),
      }).then(() => {
        setShowModal(false);
        router.push("/");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex min-h-[416px] bg-[#003145] px-32 items-center gap-16 flex-wrap text-white py-4 justify-between">
        <div className="flex flex-col gap-6 items-start max-w-[792px] z-20">
          <div className="flex items-center gap-8">
            <div className="relative rounded-[8px] overflow-hidden h-[120px] w-[120px]">
              <Image
                src={found?.pic}
                layout="fill"
                alt={found?.title}
                objectFit="cover"
              />
            </div>
            <h3 className="text-4xl text-[#ffffff] font-medium">
              {found?.title}
            </h3>
          </div>
          <p className="text-lg text-[#ffffff] font-medium">{found?.body}</p>
          <div className="flex gap-6 items-center">
            <div
              className="border-r-2 border-[#F5F5F5] pr-4 cursor-pointer"
              onClick={editTask}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.6501 9.54L14.8101 9.12L12.9201 4.67C12.5801 3.86 11.4201 3.86 11.0801 4.67L9.19007 9.13L4.36007 9.54C3.48007 9.61 3.12007 10.71 3.79007 11.29L7.46007 14.47L6.36007 19.19C6.16007 20.05 7.09007 20.73 7.85007 20.27L12.0001 17.77L16.1501 20.28C16.9101 20.74 17.8401 20.06 17.6401 19.2L16.5401 14.47L20.2101 11.29C20.8801 10.71 20.5301 9.61 19.6501 9.54ZM12.0001 15.9L8.24007 18.17L9.24007 13.89L5.92007 11.01L10.3001 10.63L12.0001 6.6L13.7101 10.64L18.0901 11.02L14.7701 13.9L15.7701 18.18L12.0001 15.9Z"
                  fill={found?.type === true ? "yellow" : "white"}
                />
              </svg>
            </div>
            <div className="flex gap-1 items-center bg-[#255973] py-[6px] px-3 rounded-2xl ">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 2.49984H12.6666V1.83317C12.6666 1.4665 12.3666 1.1665 11.9999 1.1665C11.6333 1.1665 11.3333 1.4665 11.3333 1.83317V2.49984H4.66659V1.83317C4.66659 1.4665 4.36659 1.1665 3.99992 1.1665C3.63325 1.1665 3.33325 1.4665 3.33325 1.83317V2.49984H2.66659C1.93325 2.49984 1.33325 3.09984 1.33325 3.83317V14.4998C1.33325 15.2332 1.93325 15.8332 2.66659 15.8332H13.3333C14.0666 15.8332 14.6666 15.2332 14.6666 14.4998V3.83317C14.6666 3.09984 14.0666 2.49984 13.3333 2.49984ZM12.6666 14.4998H3.33325C2.96659 14.4998 2.66659 14.1998 2.66659 13.8332V5.83317H13.3333V13.8332C13.3333 14.1998 13.0333 14.4998 12.6666 14.4998Z"
                  fill="#F5F5F5"
                />
              </svg>
              <p className="text-[#F5F5F5] text-sm ">
                {new Date(found?.date).toDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-4 items-center">
          <button className="w-[120px] h-[40px] rounded-[10px] border-[1px] border-[#fff] text-[#ffffff] px-[18px] py-[6px] flex items-center text-base gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 17.4601V20.5001C3 20.7801 3.22 21.0001 3.5 21.0001H6.54C6.67 21.0001 6.8 20.9501 6.89 20.8501L17.81 9.94006L14.06 6.19006L3.15 17.1001C3.05 17.2001 3 17.3201 3 17.4601ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z"
                fill="white"
              />
            </svg>
            Edit
          </button>
          <button
            className="w-[120px] h-[40px] rounded-[10px] border-[1px] border-[#fff] text-[#ffffff] px-[18px] py-[6px] flex items-center text-base gap-2"
            onClick={() => setShowModal(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM18 4H15.5L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4Z"
                fill="white"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
      <div className="flex  bg-[#ffffff] px-32 items-start gap-16 flex-wrap  py-4 justify-between my-6">
        <div className="flex flex-col gap-3 max-w-[760px]">
          <h5 className="text-[#222222] text-xl">Description</h5>
          <p className="text-[#333333] text-base">{found?.description}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 ">
            <p className="text-lg text-[#858585]">Hackathon</p>
            <h3 className="text-xl text-[#333333] font-medium">
              Prestige Interview Challenge
            </h3>
            <p className="text-sm text-[#858585] font-medium flex items-center gap-1">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 2.25H14.25V1.5C14.25 1.0875 13.9125 0.75 13.5 0.75C13.0875 0.75 12.75 1.0875 12.75 1.5V2.25H5.25V1.5C5.25 1.0875 4.9125 0.75 4.5 0.75C4.0875 0.75 3.75 1.0875 3.75 1.5V2.25H3C2.175 2.25 1.5 2.925 1.5 3.75V15.75C1.5 16.575 2.175 17.25 3 17.25H15C15.825 17.25 16.5 16.575 16.5 15.75V3.75C16.5 2.925 15.825 2.25 15 2.25ZM14.25 15.75H3.75C3.3375 15.75 3 15.4125 3 15V6H15V15C15 15.4125 14.6625 15.75 14.25 15.75Z"
                  fill="#858585"
                />
              </svg>{" "}
              {new Date(found?.date).toDateString()} -{" "}
              {new Date(found?.end).toDateString()}
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <a href={found?.github} className="no-underline	" target="blank">
              <button className="w-[214px] h-[40px] rounded-[10px] border-[1px] border-[##666666] text-[##666666] px-[18px] py-[6px] flex items-center text-base gap-2 justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19C7.5 18.77 7.5 18.14 7.5 17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26C12.5 17.6 12.5 18.68 12.5 19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                    fill="#666666"
                  />
                </svg>
                GitHub Repository
              </button>
            </a>
            <a href={found?.other} className="no-underline	" target="blank">
              <button className="w-[214px] h-[40px] rounded-[10px] border-[1px] border-[##666666] text-[##666666] px-[18px] py-[6px] flex items-center text-base gap-2 justify-center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 19H6.5C5.95 19 5.5 18.55 5.5 18V6C5.5 5.45 5.95 5 6.5 5H11.5C12.05 5 12.5 4.55 12.5 4C12.5 3.45 12.05 3 11.5 3H5.5C4.39 3 3.5 3.9 3.5 5V19C3.5 20.1 4.4 21 5.5 21H19.5C20.6 21 21.5 20.1 21.5 19V13C21.5 12.45 21.05 12 20.5 12C19.95 12 19.5 12.45 19.5 13V18C19.5 18.55 19.05 19 18.5 19ZM14.5 4C14.5 4.55 14.95 5 15.5 5H18.09L8.96 14.13C8.57 14.52 8.57 15.15 8.96 15.54C9.35 15.93 9.98 15.93 10.37 15.54L19.5 6.41V9C19.5 9.55 19.95 10 20.5 10C21.05 10 21.5 9.55 21.5 9V4C21.5 3.45 21.05 3 20.5 3H15.5C14.95 3 14.5 3.45 14.5 4Z"
                    fill="#666666"
                  />
                </svg>
                Other Link
              </button>
            </a>
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete Modal</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    This action is irreversible. Are you sure you want to delete
                    this model?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#DF2C1D] text-white  font-bold uppercase text-sm px-6 py-3 rounded-[10px] shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteTask}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
