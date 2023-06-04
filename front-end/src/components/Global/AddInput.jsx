import { useState } from "react";
const AddInput = ({ handleChange, ...rest }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <>
      <div {...rest} className="flex justify-between max-w-[27rem] py-2">
        <div className="flex gap-4">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            className="w-[20rem] text-secondaryColor bg-transparent"
          />
        </div>
        <button
          onClick={async () => {
            if(value!==''){
              handleChange(value);
              setValue("");
              setError("");
            } else {
               setError("This field can't be empty");
              await sleep(4000);
              setError("");
            }
         
          }}
          className="text-primaryColor text-fs-400"
        >
          Ajouter
        </button>
      </div>
      {error && <div className="text-mainRed text-fs-300">{error}</div>}
    </>
  );
};

export default AddInput;
