import Topic from "./Topic";
export default function AllTopics({choices,handleClickTopic}) {

  const all = choices.map((ch , index) => {
    return <Topic
        handleClickTopic={handleClickTopic}
        key={ch.id}
        index ={index}
        name ={ch.name}
        icon ={ch.icon}
    />
  })
  return  <div className="choices">{all}</div>;
}
