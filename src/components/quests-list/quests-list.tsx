import QuestsItem from '../quests-item/quests-item';
import Loader from '../loader/loader';
import {QuestInfo} from '../../types/quest';

type QuestsListProps = {
  quests: QuestInfo[];
  isLoading: boolean;
}

function QuestsList({quests, isLoading}: QuestsListProps): JSX.Element {
  if (isLoading) {
    return <Loader/>;
  }

  if (quests.length === 0) {
    return (
      <p className="subtitle subtitle--size-l">Ничего не найдено. Попробуйте изменить фильтр.</p>
    );
  } else {
    return (
      <>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <div className="cards-grid">
          {
            quests.map((quest) => (
              <QuestsItem
                key={quest.id}
                quest={quest}
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default QuestsList;
