import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import "./Home.css";
import useApi, { SearchResult, SearchType, SearchError } from "../hooks/useApi";
import { useEffect, useState } from "react";
import {
  arrowBackOutline,
  chevronBack,
  chevronForward,
  gameControllerOutline,
  leafOutline,
  tvOutline,
  videocamOutline,
} from "ionicons/icons";
const Home: React.FC = () => {
  const { searchData } = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, dissmiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }
    const loadData = async () => {
      await loading();
      const results: any = await searchData(searchTerm, type);
      console.log("🚀", results);
      await dissmiss();
      if (results?.Error) {
        presentAlert(results.Error);
      } else {
        setResults(results.Search);
      }
    };
    loadData();
  }, [searchTerm, type]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
        ></IonSearchbar>
        <IonItem>
          <IonSelect
            label="Select Searchtype"
            value={type}
            onIonChange={(e) => setType(e.detail.value!)}
          >
            <IonSelectOption value="">ALL</IonSelectOption>
            <IonSelectOption value="movie">Movie</IonSelectOption>
            <IonSelectOption value="series">Series</IonSelectOption>
            <IonSelectOption value="episode">Episode</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonList>
          {results.map((item: SearchResult) => (
            <IonItem
              button
              key={item.imdbID}
              routerLink={`movies/${item.imdbID}`}
            >
              <IonAvatar slot="start">
                <IonImg src={item.Poster} />
              </IonAvatar>
              <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
              {item.Type === "movie" && (
                <IonIcon slot="end" icon={videocamOutline} />
              )}
              {item.Type === "series" && (
                <IonIcon slot="end" icon={tvOutline} />
              )}
              {item.Type === "game" && (
                <IonIcon slot="end" icon={gameControllerOutline} />
              )}
              {/* <IonIcon slot="end" icon={chevronForward} /> */}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
