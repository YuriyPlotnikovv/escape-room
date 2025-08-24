import {Link} from 'react-router-dom';
import {BookingInfo} from '../../types/booking';
import Loader from '../loader/loader';
import MyQuestsItem from '../my-quests-item/my-quests-item';

type MyQuestsListProps = {
  quests: BookingInfo[] | [];
  isLoading: boolean;
  onCancel: (id: string) => void;
}

function MyQuestsList({quests, isLoading, onCancel}: MyQuestsListProps): JSX.Element {
  if (isLoading) {
    return <Loader/>;
  }

  if (quests.length === 0) {
    return (
      <>
        <p className="subtitle subtitle--size-l">Забронированных квестов не найдено.</p>
        <br/>
        <Link to="/" className="btn btn--general">Найти квест</Link>
      </>
    );
  } else {
    return (
      <div className="cards-grid">
        {
          quests.map((quest) => (
            <MyQuestsItem
              key={quest.id}
              item={quest}
              onCancel={onCancel}
            />
          ))
        }
      </div>
    );
  }
}

export default MyQuestsList;
