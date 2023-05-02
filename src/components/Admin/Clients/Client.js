import React from "react";
const Client = ({ clientId, deleteClient }) => {
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure?</h3>

          <div className="modal-action justify-center">
            <label
              onClick={() => deleteClient(clientId)}
              htmlFor="my-modal"
              className="btn btn-sm btn-error"
            >
              Delete
            </label>
            <label htmlFor="my-modal" className="btn btn-sm ">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
