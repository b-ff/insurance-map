import Head from "next/head";

import Layout from "@components/Layout";
import Section from "@components/Section";
import Container from "@components/Container";
import Map from "@components/Map";
import * as geo from "../geodata";
import ratings from "../ratings.json";

import styles from "@styles/Home.module.scss";

const DEFAULT_CENTER = [51.5, -0.09];

const RATING_COLORS = {
  A: "#00FF00",
  B: "#A7FB61",
  C: "#FDFF55",
  D: "#FDBD24",
  E: "#FFA642",
  F: "#FF1A10",
  R: "#361F1F",
};

export default function Home() {
  const setColor = ({ properties }) => {
    return { weight: 1 };
  };

  return (
    <Layout>
      <Head>
        <title>UK Car Insurance price groups by postcode</title>
        <meta
          name="description"
          content="Interactive map showing relation between UK car motor insurance price groups and postcodes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <p className={styles.description}>
            This map shows which postcodes have the most expensive or cheapest
            car insurance prices in the UK. The higher rating for the area the
            more you pay towards your car insurance.
          </p>

          <Map
            className={styles.homeMap}
            width="800"
            height="400"
            center={DEFAULT_CENTER}
            zoom={12}
          >
            {({ TileLayer, Marker, Popup, GeoJSON }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {Object.entries(geo).map(([postcode, geojson]) => (
                  <GeoJSON
                    data={geojson}
                    pathOptions={{
                      color: RATING_COLORS[ratings[postcode]],
                      fillOpacity: 0.3,
                    }}
                    key={postcode}
                  >
                    <Popup>
                      {postcode}: {ratings[postcode]}
                    </Popup>
                  </GeoJSON>
                ))}
              </>
            )}
          </Map>
          <div className={styles.statsRow}>
            {Object.entries(RATING_COLORS).map(([rating, color]) => {
              const percentage = Math.round(
                (Object.values(ratings).filter((r) => r === rating).length /
                  Object.values(ratings).length) *
                  100
              );

              return (
                <div className={styles.statsCell}>
                  <h2
                    style={{
                      color,
                      textShadow: "1px 1px rgba(0, 0, 0, 0.5);",
                    }}
                  >
                    {percentage}%
                  </h2>
                  Rating {rating}
                </div>
              );
            })}
          </div>
          <h2>Data sources & KUDOs:</h2>
          <ul>
            <li>
              <a href="https://www.theclayclothcompany.co.uk/blogs/motoring/car-insurance-postcodes">
                theclayclothcompany.co.uk
              </a>{" "}
              — original article about insurance ratings
            </li>
            <li>
              <a href="https://github.com/colbyfayock">
                https://github.com/colbyfayock
              </a>{" "}
              — author of Next.js + React-Leaflet starter kit used in this
              project
            </li>
            <li>
              <a href="https://t.me/evstef">https://t.me/evstef</a> — original
              map idea, python implementation and inspiration
            </li>
          </ul>
        </Container>
      </Section>
    </Layout>
  );
}
