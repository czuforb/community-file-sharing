import { GridItem, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import Layout from "../src/components/Layout/Layout";

const About = () => {
  return (
    <Layout logo>
      <GridItem colStart={[0, null, 2, 4]} colSpan={[4, null, 4, 6]}>
        <Heading mb="8">Jogi Nyilatkozat</Heading>
        <Text>
          <p>
            A Települési Önkormányzatok Országos Szövetsége (a továbbiakban:
            TÖOSZ) weboldalainak (a továbbiakban: honlap) megtekintésével Ön
            elfogadja a TÖOSZ által ezen az oldalakon meghatározott
            feltételeket. Kérjük, hogy ne látogassa honlapunkat, ha ezekkel a
            feltételekkel nem ért egyet.
          </p>
          <p>
            <strong>Szerzői jog:</strong>
          </p>
          <p>
            A TÖOSZ honlapja szerzői jogvédelem alá tartozik. A TÖOSZ honlapján
            található minden tartalom, különösen, de nem kizárólagosan a TÖOSZ
            által biztosított szoftverek, technológia, a felületen kialakított
            design elemek, szöveges elemek, grafikák, logók, linkek, animációk,
            videók, illusztrációk, hangfájlok, képek, stb. (a továbbiakban:
            TÖOSZ által szolgáltatott tartalom), a TÖOSZ tulajdonát képezik és a
            szerzői jogi védelem alatt állnak. A TÖOSZ előzetes írásbeli
            engedélye nélkül tilos a honlap-tartalom egészét vagy egyes részeit
            bármely formában átruházni, terjeszteni, reprodukálni vagy a saját
            személyes használatot meghaladó mértékben tárolni, kinyomtatni,
            azokat másnak nyilvánosság számára hozzáférhetővé tenni.
          </p>
          <p>
            <strong>Felhasználási engedély:</strong>
          </p>
          <p>
            A honlapon található "TÖOSZ" márkanév mind szöveges, mind ábrás
            formában (logó) a TÖOSZ tulajdonát képezi és védjegyoltalom alatt
            áll. A fentiekben megjelölt márkajelzések egyike sem használható fel
            semmilyen módon és jogcímen a TÖOSZ előzetes írásos engedélye
            nélkül. A jogellenes felhasználás a szerzői, a polgári, illetve a
            büntető jogi anyagi jogszabályokban foglalt jogkövetkezményeket
            vonhatja maga után.
          </p>
          <p>
            <strong>Felelősség kizárása:</strong>
          </p>
          <p>
            A TÖOSZ honlapján található oktatási anyagok szerzői jogi védelem
            alatt állnak, így azokért nem vállal felelősséget semmilyen
            formában, különösen:
          </p>
          <ul>
            <li>az anyagok minőségéért,</li>
            <li>
              az anyagok tartalmáért, oktatott tudásanyagért, az átadott
              információk valódiságáért,
            </li>
            <li>
              a kurzusok semmilyen tartalmáért, amelyet magukban foglalnak,
            </li>
            <li>
              a kurzusok tartalma átirányíthat más oldalakra, amik
              tevékenységért, adatvédelméért sem vállal felelősséget a TÖOSZ,
              minden felhasználó saját maga köteles tájékozódni, hogy hol ér
              véget a TÖOSZ felülete,
            </li>
            <li>a weboldal, applikáció zavar- és hibamentes működéséért.</li>
          </ul>
          <p>
            <strong>Információk gyűjtése és felhasználása:</strong>
          </p>
          <p>
            A honlap látogatója tudomásul veszi, a honlap és az ott található
            szolgáltatások használatával, igénybevételével kifejezetten
            elfogadja, hogy ennek során és ebben a vonatkozásban a TÖOSZ
            ügyfelének (a továbbiakban: ügyfél) tekintendő akkor is, ha
            egyébként a TÖOSZ szolgáltatását nem veszi igénybe. A TÖOSZ
            tájékoztatja ügyfeleit, hogy a honlapot alkalomszerűen
            meglátogatókról azok egyedi azonosítására alkalmas adatot nem gyűjt,
            néhány szolgáltatás megrendeléséhez, igénybevételéhez ún.
            regisztráció szükséges, amelyhez bizonyos személyes adatok megadása
            is szükséges lehet. A TÖOSZ ezeket az adatokat kizárólag az ügyfél
            által igényelt szolgáltatás teljesítéséhez, illetve ügyfél
            hozzájárulása esetén saját marketing tevékenységéhez, közvetlen
            üzletszerzés és az előfizető tájékoztatása céljára használja fel. Az
            adatok az adattulajdonos előzetes tájékoztatása és engedélye nélkül
            harmadik személy részére nem kerülnek átadásra. Az adattulajdonos az
            adatvédelmi és távközlési jogszabályokban meghatározott módon és
            esetekben a Települési Önkormányzatok Országos Szövetsége 1071
            Budapest, Damjanich u. 44. 3/1. és az toosz@toosz.hu elektronikus
            címeken keresztül kérheti a nyilvántartott személyes adatainak
            törlését, módosítását, illetőleg a kezelt adatokról való
            tájékoztatását.
          </p>
          <p>
            A honlapról összegyűjtött információ kizárólagos tulajdonosa a
            TÖOSZ.
          </p>
          <p>
            <strong>Adatvédelem:</strong>
          </p>
          <p>
            Azzal, hogy a TÖOSZ részére bármely személyes adatát akár a honlap
            űrlapjainak használatával, akár a honlapon feltüntetett e-mailben
            elküldi, hozzájárul ahhoz, hogy az elküldött adatot a TÖOSZ a
            fentiekben meghatározott módon és terjedelemben a vonatkozó
            jogszabályok előírásai szerint kezelje.
          </p>
          <p>
            Tájékoztatjuk, hogy a honlap látogatása során az Ön számítógépének
            IP címe és a böngésző szoftvertől függő egyes adatait a honlapra
            vonatkozó kéréseket kiszolgáló informatikai rendszer látogatottsági
            statisztikák készítése és a rosszindulatú informatikai támadások
            vagy próbálkozások beazonosítása végett kezeli.
          </p>
          <p>
            A TÖOSZ kijelenti, hogy a rendelkezésre bocsátott személyes adatokat
            az információs önrendelkezési jogról és az információszabadságról
            szóló 2011. évi CXII. törvény rendelkezéseit maradéktalanul
            megtartva kezeli.
          </p>
          <p>
            <strong>Linkek:</strong>
          </p>
          <p>
            A honlapon megtalálhatóak más cégek honlapjainak linkjei. A TÖOSZ
            nem felelős más honlapok titoktartási és adatkezelési gyakorlatával
            kapcsolatban. Az itt található adatkezelési és titoktartási
            nyilatkozatok csak a TÖOSZ honlapjára vonatkoznak.
          </p>
          <p>
            <strong>Biztonság:</strong>
          </p>
          <p>
            A TÖOSZ minden szükséges intézkedést megtesz, hogy az ügyfelek
            személyes adatait illetéktelenektől megvédje. Az ügyfeleink
            személyes adatainak védelmét szolgálják a különböző adatbázisokhoz
            való társaságon belüli eltérő szintű hozzáférési jogosultságok is,
            amely eredményeként csak az erre kijelölt alkalmazottak jogosultak a
            személyes adatokhoz való hozzáférésre, mégpedig kizárólag
            tevékenységük ellátásához szükséges mértékben.
          </p>
          <p>
            <strong>Jogviták:</strong>
          </p>
          <p>
            A jelen felhasználási feltételek alkalmazásából, illetve a honlap
            felhasználásból eredő és peren kívül nem rendezhető jogviták
            eldöntése a hatáskörrel és illetékességgel rendelkező magyar
            bíróságok előtt történik.
          </p>
          <p>
            <strong>
              <br />
              Települési Önkormányzatok Országos Szövetsége
            </strong>
          </p>
        </Text>
      </GridItem>
    </Layout>
  );
};

export default About;
