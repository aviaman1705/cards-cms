import "./CardDetails.css";

const CardDetails = (props) => {
  return (
    <div id="card-dtails-container">
      <div className="card-details-item">
        <h3 id="card-details-name"> {props.bizName}</h3>
        <p id="card-details-desc">{props.bizDescription}</p>
        <div id="card-details-address">
          <span>{props.bizPhone}</span>
          <span>{props.bizAddress}</span>
        </div>
        <div id="card-details.image">
          <img src={props.bizImage} alt={props.bizName} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
