import { isArray } from "lodash";

const ResError = ({ error }) => {
  return error ? (
    typeof error === "object" ? (
      isArray(error) ? (
        error.map((err, idx) => {
          return (
            <div
              key={idx}
              className="bg-danger-subtle text-danger text-center py-1 my-1 rounded"
            >
              <span>{`${Object.keys(err)[0]}: ${Object.values(err)}`}</span>
            </div>
          );
        })
      ) : (
        <div className="bg-danger-subtle text-danger text-center py-1 my-1 rounded">
          {Object.keys(error).map((key, idx) => {
            return (
              <div
                key={idx}
                className="bg-danger-subtle text-danger text-center py-1 my-1 rounded"
              >
                <span>
                  `${key}: ${error[key]}`
                </span>
              </div>
            );
          })}
        </div>
      )
    ) : (
      <div className="bg-danger-subtle text-danger text-center py-1 my-1 rounded">
        <span>{error}</span>
      </div>
    )
  ) : null;
};

export default ResError;
