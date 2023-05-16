import { useState } from "react";
import data from "./data/data.json";
import remove from "/images/icon-remove.svg";

function App() {
  const [jobs] = useState(data);
  const [filters, setfilters] = useState([]);

  const handleClick = (e) => {
    const valor = e.target.innerText;

    if (!filters.some((filter) => filter === valor)) {
      setfilters((prevState) => [...prevState, valor]);
    }
  };

  const handleSetTag = (valor) => {
    setfilters(filters.filter((tag) => tag !== valor));
  };

  return (
    <>
      <header className="header bg-teal-600 relative ">
        {filters.length > 0 ? (
          <section className="filters flex gap-4 justify-between w-11/12 lg:w-5/6 max-w-5xl bg-white rounded-lg shadow-md shadow-teal-200 p-5 lg:p-7 lg:px-10 mb-6">
            <ul className="flex flex-wrap gap-2 lg:gap-4">
              {filters.map((tag, index) => (
                <li
                  key={index}
                  onClick={() => handleSetTag(tag)}
                  className="bg-gray-100 flex items-center gap-2 pl-2 mt-1 text-teal-500 font-medium cursor-pointer rounded-l-sm"
                >
                  {tag}
                  <img
                    className="w-7 bg-teal-500 p-2 rounded-r-sm"
                    src={remove}
                  />
                </li>
              ))}
            </ul>
            <button
              onClickCapture={() => setfilters([])}
              className="text-teal-600 capitalize font-semibold hover:text-teal-500"
            >
              Clear
            </button>
          </section>
        ) : null}
      </header>

      <main className="max-w-5xl w-11/12 lg:w-5/6 mx-auto grid gap-12 mt-16 pb-10">
        {jobs?.map((jobs) => {
          let jobTags = [
            jobs.role,
            jobs.level,
            ...(jobs.languages || []),
            ...(jobs.tools || []),
          ];
          let filterJobs = (jobTags, filters) => 
          filters.every((value) => jobTags.includes(value));

          return (
            (filterJobs(jobTags , filters) && (
              <article
              key={jobs.id}
              className={`relative  bg-white shadow-md shadow-teal-200 rounded-lg pt-12 lg:pt-7 pb-5 lg:pb-7 px-7 ${
                jobs.featured && jobs.new
                  ? "border-teal-500 border-l-[5px]"
                  : ""
              } card`}
            >
              <img
                className="w-14 object-cover lg:w-24 absolute lg:relative -top-6 left-6 lg:left-0 lg:col-start-1 lg:top-0 lg:row-start-1 lg:row-end-4"
                src={jobs.logo}
                alt={`reference-company-${jobs.company}`}
              />
              <div className="flex gap-5 items-center lg:col-start-2">
                <h2 className="text-lg text-teal-600">{jobs.company}</h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-white bg-teal-700 uppercase  text-sm   pt-1 px-4 rounded-xl ${
                      jobs.new ? "block" : "hidden"
                    }`}
                  >
                    new
                  </span>
                  <span
                    className={`text-white bg-slate-700  uppercase  text-sm pt-1 px-4 rounded-xl ${
                      jobs.featured ? "inline-block" : "hidden"
                    }`}
                  >
                    featured
                  </span>
                </div>
              </div>
              <h2 className="my-2 font-bold text-base md:col-start-1 lg:col-start-2 lg:text-lg">
                {jobs.position}
              </h2>
              <ul className="flex gap-8 items-center md:col-start-1 lg:col-start-2">
                <li className="text-gray-500 list-disc first:list-none">
                  {jobs.postedAt}
                </li>
                <li className="text-gray-500 list-disc">{jobs.contract}</li>
                <li className="text-gray-500 list-disc">{jobs.location}</li>
              </ul>
              <div className="h-[0.5px] w-full bg-gray-300 my-4 md:hidden"></div>
              <div className="flex items-center gap-2 md:col-start-2 lg:col-start-3 md:row-start-1 md:row-end-4 md:justify-center">
                <ul className="flex items-center gap-2">
                  <li
                    onClick={handleClick}
                    className="text-teal-700 font-medium py-1 px-2 rounded-sm bg-gray-100 hover:bg-gray-50 hover:cursor-pointer"
                  >
                    {jobs.role}
                  </li>
                  <li
                    onClick={handleClick}
                    className="text-teal-700 font-medium py-1 px-2 rounded-sm bg-gray-100 hover:bg-gray-50 hover:cursor-pointer"
                  >
                    {jobs.level}
                  </li>
                  {jobs.languages.length >= 1
                    ? jobs.languages.map((languages) => (
                        <li
                          onClick={handleClick}
                          className="text-teal-700 font-medium py-1 px-2 rounded-sm bg-gray-100 hover:bg-gray-50 hover:cursor-pointer"
                          key={languages}
                        >
                          {languages}
                        </li>
                      ))
                    : ""}
                </ul>
                <ul className="flex items-center gap-2">
                  {jobs.tools.length >= 1
                    ? jobs.tools.map((tools) => (
                        <li
                          onClick={handleClick}
                          className="text-teal-700 font-medium py-1 px-2 rounded-sm bg-gray-100 hover:bg-gray-50 hover:cursor-pointer"
                          key={tools}
                        >
                          {tools}
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </article>
            ))
           
          );
        })}
      </main>
    </>
  );
}

export default App;
