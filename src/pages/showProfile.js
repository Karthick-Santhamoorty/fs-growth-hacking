import DefaultPage from "../components/layout/defaultPage";
import { React, useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

export default function ShowProfile(props) {
  const { id } = useParams();
  const url = process.env.REACT_APP_BE_ENDPOINT;
  const [errorFromApi, setErrorFromApi] = useState();
  const [loading, setLoading] = useState(true);
  const [candidatedata, setCandidateData] = useState();

  useEffect(() => {
    fetch(`${url}/candidate_details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        setErrorFromApi(response.json());
      } else {
        return response.json();
      }
    })
    .then((res) => {
      setCandidateData(res.data[0].candidatedata[0]);
      setLoading(false);
      window.scrollTo(0, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DefaultPage>
      <div className="mt-5 mx-5 border-b-2">
        <div className="mb-3 flex justify-between ">
          <h1 className="text-3xl text-primary select-none font-medium">
            <span className="font-semibold">FS</span> Growth Hacking
          </h1>
          <Link to={`/`} className="text-lg bg-primary rounded-md bg- px-3 py-1 hover:bg-primaryBlue text-white">
            Home
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="w-full flex items-center h-screen justify-center">
          <ThreeDots color="#60C0F6" height={50} width={50} />
        </div>
      ) : (
        candidatedata? (
          <section className="container mx-auto my-10">
            <div className="profile-img">
              <img
                src={`${
                  candidatedata?._source?.profileImg !== "None"
                    ? candidatedata._source.profileImg
                    : "../images/user-image.png"
                }`}
                alt="User"
                className="w-80 h-80 mx-auto"
              />
            </div>
            <div className="details-section grid grid-cols-8 mt-5 border-2 border-fsBlue rounded-lg">
              <div className="col-span-4 border-r-2">
                <div className="mr-1">
                  <p className="text-3xl my-5 text-center">Details</p>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1">
                      <p className="text-right text-lg text-fsBlue">Name:</p>
                    </div>
                    <div className="col-span-4 ml-2">
                      <p className="text-left text-lg">
                        {candidatedata?._source?.candidateName}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1">
                      <p className="text-right text-lg text-fsBlue">
                        Location:
                      </p>
                    </div>
                    <div className="col-span-4 ml-2">
                      <p className="text-left text-lg">
                        {candidatedata?._source?.location}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1">
                      <p className="text-right text-lg text-fsBlue">
                        Experience:
                      </p>
                    </div>
                    <div className="col-span-4 ml-2">
                      <p className="text-left text-lg">
                        {`${
                          candidatedata?._source?.totalExperience &&
                          candidatedata._source.totalExperience > 1
                            ? candidatedata._source.totalExperience + " yrs"
                            : candidatedata._source.totalExperience + " yr"
                        }`}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1">
                      <p className="text-right text-lg text-fsBlue">About:</p>
                    </div>
                    <div className="col-span-4 ml-2">
                      <p className="text-left text-lg">
                        {candidatedata._source.about}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1">
                      <p className="text-right text-lg text-fsBlue">Title:</p>
                    </div>
                    <div className="col-span-4 ml-2">
                      <p className="text-left text-lg">
                        {candidatedata._source.title}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">
                      <p className="text-right text-lg text-fsBlue">Current Job Title:</p>
                    </div>
                    <div className="col-span-3 ml-2">
                      <p className="text-left text-lg">
                        {candidatedata._source.jobTitle}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">
                      <p className="text-right text-lg text-fsBlue">Current Job Type:</p>
                    </div>
                    <div className="col-span-3 ml-2">
                      <p className="text-left text-lg">
                        {candidatedata._source.jobType}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center items-center">
                    <a
                      href={candidatedata?._source?.userUrl}
                      className="text-center text-xl text-primary"
                      rel="noopener noreferrer" target="_blank"
                    >
                      Go to LinkedIn
                    </a>
                      <span className="ml-2">
                        <svg width="10" height="10" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.125 7.99375L6.74375 1.375H2.625V0.125H8.875V6.375H7.625V2.25625L1.00625 8.875L0.125 7.99375Z" fill="#213251"/>
                        </svg>
                      </span>
                  </div>
                </div>
              </div>
              <div className="col-span-2 border-r-2">
                <div className="mr-1">
                  <p className="text-3xl my-5 text-center">Skills</p>
                  <div className="flex flex-wrap pl-2 justify-center">
                    {candidatedata?._source?.skills.map((skill, index) => (
                      <p
                        className="bg-slate-500 border rounded-2xl py-1 px-3 mr-3 mb-3 text-white"
                        key={index}
                      >
                        {skill}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="ml-5">
                  <p className="text-3xl my-5 text-center">Experience</p>
                  <div className="timeline relative">
                    {candidatedata?._source?.experience?.slice(0)?.reverse()?.map((exp, index) => (
                        <div className="timeline-item relative mb-8 pl-10 pt-3" key={index}>
                        <span className="text-lg">
                          {exp[2]}
                        </span>
                        <p className="text-xl">
                            {exp[0]}
                        </p>
                        <p className="text-base">
                        {exp[1]}
                        </p>
                        <p className="text-base">
                        {exp[3]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
        :
        <div>
            <p className="text-lg text-red-600">{errorFromApi}</p>
        </div>
      )}
    </DefaultPage>
  );
}
