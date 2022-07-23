import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Game from '../Components/game';
import { RecoilRoot } from '../node_modules/recoil/index';

export default function Home() {
  return (
    <RecoilRoot>
      <div className = {styles.home}>
        <Game />
      </div>
    </RecoilRoot>
  );
}
