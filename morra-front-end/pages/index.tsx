import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserState, setEmail, setName } from '../store/slices/userSlice';
import { useState } from 'react';
import classNames from 'classnames';

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUserState);

    const changeUser = () => {
        dispatch(setName('Ivan'));
    };
    const [isActive, setActive] = useState(false);
    const toggleClass = () => {
        setActive(!isActive);
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>The Morra Game</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
                    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet" />
            </Head>

            <section className="hero is-fullheight is-fullwidth is-default is-bold">
                <div className="hero-head">
                    <nav className="navbar is-default is-bold">
                        <div className="navbar-brand">
                            <a className="navbar-item" href="/">
                                MORRA GAME
                            </a>
                            <div className="navbar-burger burger" data-target="navbarExampleTransparentExample" onClick={toggleClass}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                        <div id="navbarExampleTransparentExample" className={isActive ? "navbar-menu is-active" : "navbar-menu"}>

                            <div className="navbar-end">
                                <a className="navbar-item is-active" href="/">
                                    Home
                                </a>
                                <a className="navbar-item" href="/game">
                                    Game
                                </a>
                                <a className="navbar-item" href="/highscores">
                                    Highscores
                                </a>
                                <a className="navbar-item" href="/profile">
                                    Profile
                                </a>
                                <a className="navbar-item" href="/register">
                                    Register
                                </a>
                                <a className="navbar-item" href="/login">
                                    Login
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className={classNames("has-text-centered", styles.animated_text)}>
                    <div>
                        <span>T</span>
                        <span>H</span>
                        <span>E</span>
                        <span>&nbsp;</span>
                        <span>M</span>
                        <span>O</span>
                        <span>R</span>
                        <span>R</span>
                        <span>A</span>
                        <span>&nbsp;</span>
                        <span>G</span>
                        <span>A</span>
                        <span>M</span>
                        <span>E</span>
                    </div>
                </div>
                <div className={classNames("hero-body", styles.container)}>
                    <div className={classNames("parallax", styles.parallax)}>
                        <div className={classNames("parallax_layer parallax_layer_0", styles.parallax_layer, styles.parallax_layer_0)}>
                            <img src="/static/1_sun.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_1", styles.parallax_layer, styles.parallax_layer_1)}>
                            <img src="/static/2_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_2", styles.parallax_layer, styles.parallax_layer_2)}>
                            <img src="/static/2_1_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_3", styles.parallax_layer, styles.parallax_layer_3)}>
                            <img src="/static/2_2_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_4", styles.parallax_layer, styles.parallax_layer_4)}>
                            <img src="/static/2_3_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_5", styles.parallax_layer, styles.parallax_layer_5)}>
                            <img src="/static/2_4_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_6", styles.parallax_layer, styles.parallax_layer_6)}>
                            <img src="/static/2_5_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_7", styles.parallax_layer, styles.parallax_layer_7)}>
                            <img src="/static/2_6_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_8", styles.parallax_layer, styles.parallax_layer_8)}>
                            <img src="/static/2_7_mountain.png" />
                        </div>
                        <div className={classNames("parallax_layer parallax_layer_9", styles.parallax_layer, styles.parallax_layer_9)}>
                            <img src="/static/2_8_mountain.png" />
                        </div>
                        <div className={classNames("parallax_cover", styles.parallax_cover)}>
                            <div className={classNames(" is-multiline columns is-centered container__juicer", styles.container__juicer)}>
                                Rules, hyperlinks, history plus the game
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
