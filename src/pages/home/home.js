import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import { Container, Card } from 'semantic-ui-react';

export default class HomePage extends Component {
  // on transition end,
  // on mouse out, add hidde class to content

  render() {
    return (
      <>
        <div id='title-banner'>
          <Container>
            <h1>Inu20</h1>
            <h2>Doghead and doghead's personal website</h2>
          </Container>
        </div>

        <Container textAlign='center' id='aWord'>
          <h2>Word.</h2>
          <h4>
            <i>-A word from doghead.</i>
          </h4>
        </Container>

        <Card.Group as={Container} centered itemsPerRow='2' stackable>
          <Card
            as={Link}
            to='./restaurants'
            image='https://lh3.googleusercontent.com/NImavvOijoj1SOBSPA2sKmzJjA1lCiWe87ev0-Xe0tI1odAVgIzopAOKDdC2OmUS42BIsnaWjlhrCo-ORxluKfXUY94g4-_HiJu_lDtCvg1z83yuF3Ah1B3vQyegTzMZ8OgLG8VUtMAUBgaZxtliaiStwCcfDuDhZ4FV1B-0iqAO6VMgrrOtMXzV5tBVzoF07T9hu8sC8YYOMbBk4cRq_W22nZLn4dkw6tf2yBtpqyZPerbpd730lbia0CBEiH_6OWx6Re7mp5RMBS4SeBAtHyT9Jo4iPBn-mowAbLkp9X_5PlwfGKiI5uRYZxJRbkv5cI7ftSUR_HcqdWKI2rG2b36jNoq_OUIW6zj_beK0c8vZunBEgabu63V0qlqN4PsN7xeO8NTVY60_pW8IO22PffAbPpaSFO49GD7NfVkVlo32B8-wXsIBLAsH6LNCWq5-Kj1D11dwOjw7mXhX4RZkRK5sij-NySVO4BrUvVX32kRgnEo8aJltoXp217ltKthaV4TxPtr31AvPWx7uZreoFjD2yVMNCAxtZ9gmPKy74EL12_YFkgZh0ygshPlghFHLElr0zs7dxp_PiqA8ZeiHg_MIR7xRsRKBieVHnlWwhupd5Zb0t0bz5G_7BL5qfjGi-WqO3W8znvQ3a8ydaeS-Qd_f7eD5Myp-_uI3Bmd-PrPQqjEMcVwYIsD0TaRXgw=w800-h248-no'
            header='Restaurant List'
            meta='For Authenticated Users Only'
            description='Use this App in case of having difficulty deciding a destination for lunch and dinner.'></Card>

          <Card
            as={Link}
            to='./doghead-zh'
            image='https://i.imgur.com/IR42UdO.jpg'
            header='Doghead Comics'
            meta='Public'
            description='Boring Comics'></Card>
        </Card.Group>
      </>
    );
  }
}
