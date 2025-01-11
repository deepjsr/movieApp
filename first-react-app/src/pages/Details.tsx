import {
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import useApi, { DetailsResult } from "../hooks/useApi";
import {
  bodyOutline,
  bookOutline,
  starHalfOutline,
  starHalfSharp,
  trophyOutline,
} from "ionicons/icons";
import { useState } from "react";

interface DetailsPageProps extends RouteComponentProps<{ id: string }> {}
const Details: React.FC<DetailsPageProps> = ({ match }) => {
  const [loading, dissmiss] = useIonLoading();
  const { getDetails } = useApi();
  const [information, setInformation] = useState<DetailsResult | null>(null);
  useIonViewWillEnter(() => {
    (async () => {
      await loading();
      const id = match.params.id;
      const result = await getDetails(id);
      await dissmiss();
      setInformation(result);
      console.log("🚀", result);
    })();
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonBackButton defaultHref="/movies" />{" "}
          </IonButton>
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {information && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {information.Title}&nbsp;
                <IonText color="medium">({information.Language})</IonText>
              </IonCardTitle>
              <IonCardSubtitle>{information.Year}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent text-center>
              <IonImg src={information.Poster} />
              <IonItem>
                <IonIcon icon={starHalfSharp} slot="start" color="warning" />
                <IonLabel>{information.imdbRating}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
        <IonModal
          trigger="open-modal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
        >
          <IonContent className="ion-padding">
            <IonItem>
              <IonIcon icon={bodyOutline} slot="start" />
              <IonLabel className="ion-text-wrap">
                {information?.Actors}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon icon={trophyOutline} slot="start" />
              <IonLabel className="ion-text-wrap">
                {information?.Awards}
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonIcon icon={bookOutline} slot="start" />
              <IonLabel className="ion-text-wrap">{information?.Plot}</IonLabel>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" id="open-modal">
          Show More
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};
export default Details;
