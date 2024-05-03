import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoCreateSharp } from "react-icons/io5";
import moment from "moment";
import { createTask } from "./Api/task";
const App = () => {
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);
  // const [ID, setID] = useState("");
  const [parent, enableAnimations] = useAutoAnimate();

  const onToggle = () => {
    setToggle(!toggle);
  };

  const fetchData = () => {
    const url: string = "http://localhost:1200/get-combine";

    fetch(url, { method: "GET" })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);

        setData(res?.data);
      });
  };

  const updateProgressData = (ID: string) => {
    const url: string = `http://localhost:1200/progress/${ID}`;

    fetch(url, { method: "PATCH" })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        console.log("res progress", res);

        setData(res?.data);
        window.location.reload();
      });
  };

  const changeToDone = (ID: string) => {
    const url: string = `http://localhost:1200/done/${ID}`;

    fetch(url, { method: "PATCH" })
      .then((res: any) => {
        return res.json();
      })
      .then((res) => {
        console.log("res progress", res);

        setData(res?.data);
        window.location.reload();
      });
  };
  const CreateTask = () => {
    const url: string = `http://localhost:1200/create`;

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    })
      .then((res: any) => {
        return res.json();
      })
      .then(() => {
        window.location.reload();
      });
  };

  let title = Object.keys(data);
  let values = Object.values(data);

  console.log(values);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 flex flex-col relative">
      {toggle && (
        <div className="absolute flex flex-col top-0 h-screen items-center justify-center w-full left-0 backdrop-blur-sm z-10">
          <input
            type="text"
            value={text}
            placeholder="text"
            onChange={(e) => setText(e.target.value)}
            className="w-[200px] h-[40px] border p-2"
          />
          <button
            className="bg-blue-950 w-[200px] h-[30px] rounded text-white font-bold mt-3 mb-10 "
            onClick={() => {
              setText("");
              onToggle();
              CreateTask();
            }}
          >
            add
          </button>
        </div>
      )}
      <div className="border rounded-md lg:min-w-[970px] w-full p-4">
        <div className="gap-3 grid grid-cols-3">
          {title?.map((props: string) => (
            <div key={props}>
              <div className="border rounded-md p-4 flex justify-between">
                <span className="capitalize font-medium">{props}</span>

                {props === "task" && (
                  <IoCreateSharp
                    className="cursor-pointer text-[25px]"
                    onClick={onToggle}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div ref={parent} className="mt-6 grid grid-cols-3 gap-3">
          {values?.map((el: any) => (
            <div>
              {el! &&
                el?.map((props: any) => (
                  <main className="border rounded-md p-2 my-2 pb-2">
                    <p className="text-[16px] font-bold mb-1">{props.title}</p>
                    <p className="text-[12px] text-gray-600 capitalize">
                      {moment(props.createdAt).fromNow()}
                    </p>

                    <div className="flex justify-end">
                      <button
                        className={`py-1 px-8 ${
                          props.progress && props.done
                            ? "bg-green-500"
                            : props.progress && !props?.done
                            ? "bg-orange-500"
                            : "bg-red-500"
                        } text-white rounded-sm text-[12px] font-semibold tracking-widest`}
                        onClick={() =>
                          !props?.progress && !props?.done
                            ? updateProgressData(props?._id)
                            : props?.progress && !props?.done
                            ? changeToDone(props?._id)
                            : changeToDone(props?._id)
                        }
                      >
                        {props.progress && props.done
                          ? "completed"
                          : props.progress
                          ? "in progress"
                          : "start"}
                      </button>
                    </div>
                  </main>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
