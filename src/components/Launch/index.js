import styles from "./launch.module.css";
import moment from "moment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Launch = ({ props }) => {
  return (
    <div className={styles.launchCard}>
      <div className={styles.launchTitle}>{props.name}</div>
      <div className={styles.bottomHalf}>
        <div className={styles.launchID}>
          <CheckCircleOutlineIcon style={{ marginRight: 10, height: 20 }} />
          <span style={{ fontWeight: 900 }}>ID:</span> {props.id}
        </div>
        <div className={styles.flightNumber}>
          <LocalAirportIcon style={{ marginRight: 10, height: 20 }} />
          <span style={{ fontWeight: 900 }}>Flight Number:</span>{" "}
          {props.flight_number}
        </div>
        <div className={styles.launchDate}>
          <RocketLaunchIcon style={{ marginRight: 10, height: 20 }} />
          <span style={{ fontWeight: 900 }}>Launch Date:</span>{" "}
          {moment(props.date_utc).format("MM.DD.YYYY")}
        </div>
      </div>
    </div>
  );
};

export default Launch;
