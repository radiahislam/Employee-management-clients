import React from "react";

const ModalLeaves = ({ leavesDb, deleteLeaves }) => {
  return (
    <div>
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>
          <div className="modal-action">
            <a
              onClick={() => deleteLeaves(leavesDb)}
              className="btn btn-sm btn-error"
            >
              Delete
            </a>
            <a href="#" className="btn btn-sm ">
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLeaves;
