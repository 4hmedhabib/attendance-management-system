import { isArray } from "lodash";

const ResError = ({ error }) => {
  return error ? (
    typeof error === "object" ? (
      isArray(error) ? (
        error.map((err, idx) => {
          return (
            <div className="bg-danger-subtle text-danger text-center py-1 my-1 rounded">
              <span key={idx}>
                {`${Object.keys(err)[0]}: ${Object.values(err)}`}
              </span>
            </div>
          );
        })
      ) : (
        <div className="bg-danger-subtle text-danger text-center py-1 my-1 rounded">
          {Object.keys(error).map((key, idx) => {
            console.log(error, "err");
            return (
              <span key={idx}>
                `${key}: ${error[key]}`
              </span>
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
