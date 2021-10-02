import classes from './AboutCard.module.css';

const AboutCard = props => {
return(<div>
    <div className={classes.back}>
        
        </div>
  
        <div className={classes.info}>
            <h2>About</h2>
            <p>Bharath Bandla</p>
            <a href="https://github.com/bharathbandla" target="_blank">Github</a> <br/>
            <a href="https://www.linkedin.com/in/bharathbandla/" target="_blank">LinkedIn</a>
          </div>
    </div>
    );
};


export default AboutCard;
