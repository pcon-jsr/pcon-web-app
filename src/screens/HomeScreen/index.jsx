import React from 'react';
import styles from './index.module.scss';
import ReactTypingEffect from 'react-typing-effect';
import { ReactComponent as PconLogo } from '../../assets/pcon_logo.svg';
import Card from '../../components/Card';
import CustomButton from '../../components/CustomButton';

const HomeScreen = () => {
    return (
        <div className={styles['home']}>
            <header className={styles['header']}>
                <Card className={styles['card']}>
                    <div className={styles['logo-container']}>
                        <PconLogo className={styles['logo']} />
                    </div>
                    <div className={styles['text-container']}>
                        <h2>Coding Club of <span>NIT Jamshedpur</span></h2>
                        <ReactTypingEffect
                            className={styles['animated-text']}
                            eraseDelay={1000}
                            text={["BUILD. BREAK. CODE."]}
                        />
                    </div>
                </Card>
            </header>
            <section>
                <Card className={styles['description-card']}>
                    <h2>Who are We?</h2>
                    <p>
                        We, at Programming Club of NIT Jamshedpur, are a group of highly
                        enthusiastic and dedicated individuals striving to spread
                        algorithmic thinking to ignite the minds of the contemporary
                        generation to Code for the Future. PCON consists of a diverse
                        group which focuses on Competitive Coding, App and Web development,
                        Cloud Computing, Machine Learning, Blockchain and many more. If you think that
                        the bits are the alphabets of the future, you are One of Us,
                        spreading the gene-o-code all the way!
                    </p>
                </Card>
            </section>
            <section>
                <Card className={styles['description-card']}>
                    <h2>About the Institute</h2>
                    <p>
                        <b>National Institute of Technology, Jamshedpur</b>, earlier known as
                        Regional Institute of Technology was established on 15th August
                        1960 as a joint venture of Government of India and the Government
                        of Bihar in the chain of REC's (Regional Engineering College) in
                        India with the aim to generate technical graduates of highest
                        standards who could provide technological leadership to the
                        region. It was among the first eight Regional Engineering Colleges
                        (RECs) established as part of the Second Five-Year Plan (1956 -
                        1961). This was the only REC in the country which was named as RIT
                        (Regional Institute of Technology). Therefore RIT Jamshedpur was
                        actually the REC of undivided Bihar and Jharkhand. The foundation
                        stone of RIT (REC) Jamshedpur was laid by Dr. Srikrishna Sinha,
                        the then chief minister of Bihar , with the aim of nurturing
                        talent and setting high standards of education and excellence.
                        <br />
                    </p>

                    <CustomButton target="_blank" rel="noopener noreferrer" href={`http://nitjsr.ac.in/`}>
                        VIEW MORE
                    </CustomButton>

                </Card>
            </section>
        </div>
    );
};

export default HomeScreen;
