import {Helmet} from 'react-helmet';
import Heading from '../../components/heading/heading';
import Filters from '../../components/filters/filters';
import QuestsList from '../../components/quests-list/quests-list';
import {useAppSelector} from '../../hooks/useAppSelector';
import {getIsQuestsLoading, selectQuests} from '../../store/slices/store-data/selectors';

function Main(): JSX.Element {
  const quests = useAppSelector(selectQuests);
  const isQuestsLoading = useAppSelector(getIsQuestsLoading);

  return (
    <>
      <Helmet>
        <title>Escape Room</title>
      </Helmet>

      <div className="container">
        <Heading>
          <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге</h1>

          <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
        </Heading>

        <Filters/>

        <QuestsList quests={quests} isLoading={isQuestsLoading}/>
      </div>
    </>
  );
}

export default Main;
