    import DefaultPage from "./layout/defaultPage";
    import { React, useState } from "react";
    import { ThreeDots } from "react-loader-spinner";
    import { useNavigate } from "react-router-dom";

    export default function SearchJob(props) {
    const navigate = useNavigate();
    const [inputFoucused, setInputFocused] = useState(null);
    const [searchData, setSearchData] = useState({
        skills: "",
        jobTitle: "",
        location: "",
        jobStatus: "",
    });
    const [loading, setLoading] = useState({
        addJob: false,
        searchCandidate: false,
    });
    const [dataFromApi, setDataFromApi] = useState();
    const [errorFromApi, setErrorFromApi] = useState();
    const [error, setError] = useState({
        errorFor: "",
        msg: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [experience, setExperience] = useState({
        minExperience: "",
        maxExperience: "",
    });
    const [newJob, setNewJob] = useState("");
    const [apicallHappened, setApiCallHappened] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const url = "https://4fc1-2409-4066-21d-c2ab-3049-e665-b41a-1c11.ngrok.io";
    const regex = new RegExp(/^\d*\.?\d*$/);

    const changeHandler = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };
    const checkOpenToWork = (e) => {
        e.target.checked
        ? setSearchData({ ...searchData, jobStatus: "Opentowork" })
        : delete searchData.jobStatus;
    };

    const viewProfile = id => {
        navigate(`/viewProfile/${id}`);
    }

    const fetchCandidate = async () => {
        if (
        experience?.minExperience?.length > 0 &&
        !regex.test(experience.minExperience)
        ) {
        setError({
            errorFor: "minExperience",
            msg: "Min Experience should be numeric",
        });
        return false;
        }
        if (
        experience?.maxExperience?.length > 0 &&
        !regex.test(experience.maxExperience)
        ) {
        setError({
            errorFor: "maxExperience",
            msg: "Max Experience should be numeric",
        });
        return false;
        }
        setLoading({ ...loading, searchCandidate: true });
        const request = { ...searchData, ...experience };
        for (var req in request) {
        if (request[req].length === 0) delete request[req];
        }
        setApiCallHappened(true);
        await fetch(`${url}/search_by_term`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        })
        .then((response) => {
            if (response.status !== 200) {
            setErrorFromApi(response.json());
            } else {
            return response.json();
            }
        })
        .then((res) => {
            setDataFromApi(res.data[0].candidatedata);
            setLoading({ ...loading, searchCandidate: false });
        });
    };
    const addNewJob = async () => {
        setLoading({ ...loading, addJob: true });

        await fetch(`${url}/add_job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyword: newJob }),
        })
        .then((response) => {
            if (response.status !== 200) {
            setErrorFromApi(response.json());
            } else {
            return response.json();
            }
        })
        .then((res) => {
            setSuccessMsg("New Job Added Successfully !!!");
            setNewJob("");
            setLoading({ ...loading, addJob: false });
            setTimeout(() => {
            setShowModal(false);
            setSuccessMsg("");
            }, 2000);
        });
    };
    return (
        <DefaultPage>
        <div className="mt-5 mx-5 border-b-2">
            <div className="mb-3 flex justify-between ">
            <h1 className="text-3xl text-primary select-none font-medium">
                <span className="font-semibold">FS</span> Growth Hacking
            </h1>
            <button
                className="text-white    bg-primary rounded-md bg- px-3 py-1 hover:bg-secondary"
                onClick={() => setShowModal(true)}
            >
                Add Job
            </button>
            </div>
        </div>
        <div className="border-b-2">
            <section className="container mx-auto w-3/4 mb-5">
            <div className="input-search py-3 mt-5">
                <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                    <div
                    className={`border rounded-lg p-2 ${
                        inputFoucused === "skills" && "border-primaryBlue"
                    }`}
                    >
                    <input
                        type="text"
                        placeholder="Skills"
                        name="skills"
                        className="w-full border-none text-lg outline-none"
                        onChange={(e) => changeHandler(e)}
                        onFocus={() => setInputFocused("skills")}
                        onBlur={() => setInputFocused(null)}
                    />
                    </div>
                </div>
                <div className="col-span-2">
                    <div
                    className={`border rounded-lg p-2 ${
                        inputFoucused === "jobTitle" && "border-primaryBlue"
                    }`}
                    >
                    <input
                        type="text"
                        placeholder="Job Title"
                        name="jobTitle"
                        className="w-full border-none text-lg outline-none"
                        onChange={(e) => changeHandler(e)}
                        onFocus={() => setInputFocused("jobTitle")}
                        onBlur={() => setInputFocused(null)}
                    />
                    </div>
                </div>
                <div className="col-span-2">
                    <div
                    className={`border rounded-lg p-2 ${
                        inputFoucused === "location" && "border-primaryBlue"
                    }`}
                    >
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        className="w-full border-none text-lg outline-none"
                        onChange={(e) => changeHandler(e)}
                        onFocus={() => setInputFocused("location")}
                        onBlur={() => setInputFocused(null)}
                    />
                    </div>
                </div>
                </div>
            </div>
            <div className="flex justify-between mt-5">
                <div>
                <select
                    className="bg-gray-100 p-2 w-48 text-lg border rounded-lg"
                    name="jobType"
                    id="jobType"
                    onChange={(e) => changeHandler(e)}
                >
                    <option value="" selected>
                    Select Job Type
                    </option>
                    <option value="Full-time" className="p-1">
                    Full Time
                    </option>
                    <option value="Part-time" className="p-1">
                    Part Time
                    </option>
                    <option value="Freelancer" className="p-1">
                    Freelancer
                    </option>
                </select>
                </div>
                <div>
                <div
                    className={`border rounded-lg p-1 ${
                    inputFoucused === "minExperience" && "border-primaryBlue"
                    }`}
                >
                    <input
                    type="text"
                    name="minExperience"
                    id="minExperience"
                    className={`"w-full border-none text-lg outline-none p-1`}
                    placeholder="Enter Min Experience"
                    onChange={(e) => {
                        setExperience({
                        ...experience,
                        [e.target.name]: e.target.value,
                        });
                        setError({
                        errorFor: "",
                        msg: "",
                        });
                    }}
                    onFocus={() => setInputFocused("minExperience")}
                    onBlur={() => setInputFocused(null)}
                    />
                </div>
                {error?.errorFor === "minExperience" && (
                    <span className="text-xs text-secondary font-medium">
                    {error?.msg}
                    </span>
                )}
                </div>
                <div>
                <div
                    className={`border rounded-lg p-1 ${
                    inputFoucused === "maxExperience" && "border-primaryBlue"
                    }`}
                >
                    <input
                    type="text"
                    name="maxExperience"
                    id="maxExperience"
                    className={`border-none outline-none text-lg p-1`}
                    placeholder="Enter Max Experience"
                    pattern="[0-9]*"
                    onChange={(e) => {
                        setExperience({
                        ...experience,
                        [e.target.name]: e.target.value,
                        });
                        setError({
                        errorFor: "",
                        msg: "",
                        });
                    }}
                    onFocus={() => setInputFocused("maxExperience")}
                    onBlur={() => setInputFocused(null)}
                    />
                </div>
                {error?.errorFor === "maxExperience" && (
                    <span className="text-xs text-secondary font-medium">
                    {error?.msg}
                    </span>
                )}
                </div>
                <div className="col-span-1 flex items-center">
                <input
                    id="openToWork"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => checkOpenToWork(e)}
                />
                <label htmlFor="openToWork" className="ml-2 text-lg">
                    Open To Work
                </label>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <button
                className={` ${
                    loading?.searchCandidate
                    ? "text-indigo-50 pointer-events-none bg-gray-400"
                    : "bg-primary text-white hover:bg-secondary"
                } py-1 px-2 cursor-pointer border rounded-md w-1/4 text-lg`}
                onClick={fetchCandidate}
                disabled={loading?.searchCandidate}
                >
                {loading?.searchCandidate ? "Loading..." : "Search Candidate"}
                </button>
            </div>
            {showModal && (
                <div id="modal" className="text-black">
                <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-40 mx-auto max-w-sm sm:max-w-3xl">
                    <div className="shadow-lg relative w-full bg-white border rounded">
                        <div className="text-right flex items-start justify-between border-b">
                        <h2
                            className={`text-xl leading-none font-bold pl-3 border-l-3 border-secondary mt-4 ml-6`}
                        >
                            Add New Job
                        </h2>
                        <div
                            className="px-3 bg-secondary text-white text-3xl font-semibold inline-block cursor-pointer"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </div>
                        </div>
                        <div className="relative p-4 mt-5">
                        <div
                            className={`border rounded-lg p-2 w-3/4 mx-auto ${
                            inputFoucused === "addJob" && "border-primaryBlue"
                            }`}
                        >
                            <input
                            type="text"
                            placeholder="Enter Job Name"
                            name="addJob"
                            className="w-full border-none text-lg outline-none"
                            onChange={(e) => setNewJob(e.target.value)}
                            onFocus={() => setInputFocused("addJob")}
                            onBlur={() => setInputFocused(null)}
                            />
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <button
                            className={` ${
                                loading?.addJob
                                ? "text-indigo-50 pointer-events-none bg-gray-400"
                                : newJob.length > 0
                                ? "text-white hover:bg-secondary bg-primary"
                                : "text-indigo-50 pointer-events-none bg-gray-400"
                            } py-1 px-2 cursor-pointer border rounded-md w-1/5 text-lg`}
                            disabled={loading?.addJob}
                            onClick={addNewJob}
                            >
                            {loading?.addJob ? "Loading..." : "Add"}
                            </button>
                        </div>
                        {successMsg && (
                            <div className="text-center mt-3">
                            <span className="text-sm text-green-600 font-medium">
                                {successMsg}
                            </span>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            )}
            </section>
        </div>
        {loading?.searchCandidate ? (
            <div className="w-full flex items-center h-full justify-center">
            <ThreeDots color="#60C0F6" height={50} width={50} />
            </div>
        ) : dataFromApi?.length > 0 ? (
            <div className="result-div mt-5">
            <div className="grid grid-cols-8 gap-4">
                {dataFromApi.map((res, index) => (
                    <div className="col-span-2 border-2 rounded-lg p-3 cursor-pointer" key={index} onClick={() => viewProfile(res._id)}>
                        <div className="relative">
                        <img
                            src={`${
                            res?._source?.profileImg !== "None"
                                ? res._source.profileImg
                                : "/fs-growth-hacking/images/user-image.png"
                            }`}
                            alt="User"
                            className="w-52 mx-auto"
                            style={{ borderRadius: "50%" }}
                        />
                        {res?._source?.totalrelevantScore && (
                            <div
                            className={`border w-12 h-12 flex items-center justify-center absolute top-0 left-60 bg-green-600 text-white font-bold text-lg ${
                                res._source.totalrelevantScore >= 7
                                ? "bg-green-600"
                                : res._source.totalrelevantScore >= 4
                                ? "bg-orange-600"
                                : "bg-red-600"
                            }`}
                            style={{ borderRadius: "50%" }}
                            >
                            <p className="text-center">
                                {res._source.totalrelevantScore}
                            </p>
                            </div>
                        )}
                        </div>
                        <div className="grid grid-cols-4 mt-4">
                        <div className="col-span-2">
                            <p className="text-center text-lg">Name:</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-lg">{res?._source?.candidateName}</p>
                        </div>
                        </div>
                        <div className="grid grid-cols-4">
                        <div className="col-span-2">
                            <p className="text-center text-lg">Location:</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-lg break-words">
                            {res?._source?.location}
                            </p>
                        </div>
                        </div>
                        <div className="grid grid-cols-4">
                        <div className="col-span-2">
                            <p className="text-center text-lg">Total Experience:</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-lg">{`${
                            res?._source?.totalExperience &&
                            res._source.totalExperience > 1
                                ? res._source.totalExperience + " yrs"
                                : res._source.totalExperience + " yr"
                            }`}</p>
                        </div>
                        </div>
                        <div className="grid grid-cols-4">
                        <div className="col-span-2">
                            <p className="text-center text-lg">Current Job Title:</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-lg">{res._source.jobTitle}</p>
                        </div>
                        </div>
                        <div className="grid grid-cols-4">
                        <div className="col-span-2">
                            <p className="text-center text-lg">Source:</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-lg">{res._type}</p>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        ) : (
            apicallHappened && (
            <p> {errorFromApi ? errorFromApi : "No Results Found"}</p>
            )
        )}
        </DefaultPage>
    );
    }
