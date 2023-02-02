import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";

const InputTag = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState(["papaya"]);

  return (
    <form action="">
      <div>
        <h1>Add Fruits</h1>
        <pre>{JSON.stringify(selected)}</pre>
        <TagsInput
          value={selected}
          onChange={setSelected}
          name="fruits"
          placeHolder="enter fruits"
        />
        <em>press enter or comma to add new tag</em>
      </div>
    </form>
  );
};

export default InputTag;
