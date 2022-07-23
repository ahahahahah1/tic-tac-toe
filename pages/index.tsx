import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Game from '../Components/game';

export default function Home() {
  return (
    <div className = {styles.home}>
      <Game />
    </div>
  );
}
