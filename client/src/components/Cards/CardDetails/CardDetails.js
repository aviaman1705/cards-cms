const CardDetails = (props) => {
  return (
    <div id="card-dtails-container">
      <div className="card-details-item">
        <h3> {props.bizName}</h3>
      </div>
      <div className="card-details-item">
        <p>{props.bizDescription}</p>
      </div>
      <div className="card-details-item">
        <span>{props.bizPhone}</span>
      </div>
      <div className="card-details-item">
        <span>{props.bizAddress}</span>
      </div>
    </div>
  );
};

export default CardDetails;
