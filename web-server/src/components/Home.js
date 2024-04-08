/*
Ta Thanh Khuong: 103526664
*/
import React from 'react';
import{
    Grid,
    Container,
    Box,
}  from '@mui/material'
import banner from '../images/banner.png'

const titleStyle = {
    marginBottom:'2rem',
    fontSize:'3em',
    fontWeight: '600',
    background: 'linear-gradient(90.79deg, #023020 3.42%, rgba(2, 48, 32, 0.4) 82.66%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}

const paragraphStyle = {
    width:'78%',
    fontSize:'1.3em',
    color:'#555555'
}

const bannerStyle= {
    maxWidth:"120%"
}

const aboutContain = {
    display:'flex',
    justContent:'center',
    alignItems:'center',
    padding: '3rem',
    background: '#9AACA6',
    borderRadius:'50px',
    border: '2px solid black',
    marginTop:'2rem',
    marginBottom:'5rem'
}
const aboutStyle ={
    background: 'white',
    borderRadius:'20px',
    color:'#023020',
    textAlign: 'center',
    border: '3px solid black',
    padding: '2.5rem',
}
const aboutContent ={
    textAlign: 'center',
    fontWeight:'600',
    lineHeight:'2'
    
}

export const Home = () =>{
    return (
        <Container>
          
          <Box sx={{flexGrow:1}}>
          <Grid container spacing={2} style={{marginTop:"10rem"}}>
            <Grid item xs={7}>
                <h1 style={titleStyle}>The Best Smart Contract <br/>Audit System</h1>
                <p style={paragraphStyle}> Welcome to the Best Smart Contract Audit System, where trust and security meet innovation. Our platform is your go-to destination for comprehensive and meticulous audits of blockchain-based smart contracts. With a team of expert auditors, cutting-edge technology, and a commitment to excellence, we provide you with the confidence you need to navigate the world of decentralized applications and blockchain technology. </p>
            </Grid>
            <Grid item xs={5}>
                <img src={banner} alt="Logo" style={bannerStyle}/>
            </Grid>
            <Grid item xs={12}>
            <div>
              <Grid container spacing={2} style={aboutContain}>
                <Grid item xs={4} style={aboutStyle}>
                  <h1>About Us</h1>
                </Grid>
                <Grid item xs={8} style={aboutContent}>
                  <p> Discover the industry's top Smart Contract Audit System, setting the gold standard for auditing blockchain-based smart contracts. With our team of expert auditors and cutting-edge technology, we ensure the highest level of trust and security in the world of decentralized applications and blockchain tech.</p>
                </Grid>
              </Grid>
            </div>
          </Grid>
      </Grid>
          </Box>
        </Container>
      );
}

