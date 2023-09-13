import Style from "./style";

export default function StatisticList({ data }) {
  function renderFarm() {
    return Object.entries(data).map(([key, value]) => {
      return (
        <li key={key}>
          <h6 className="value">{`${value}+`}</h6>
          <p className="title">{key}</p>
        </li>
      );
    });
  }
  return (
    <Style>
      <ul>{renderFarm()}</ul>
    </Style>
  );
}
