import React from 'react';
import { Link } from 'react-router-dom';
// import ListItem from '@material-ui/core/ListItem';

export default function About() {
  const Openmail = ({ mailto, label }) => {
    return (
      <Link
        to="#"
        onClick={(e) => {
          window.location = mailto;
          e.preventDefault();
        }}
      >
        {label}
      </Link>
    );
  };
  return (
    <>
      <div className="aboutData">
        <h1 className="mb-3">The Expertise Hub of social media and Freelancing Accounts</h1>
        <p>
          Online Entrepreneurship and Social Media superiority is well achieved through experts such
          as social media marketers and managers who adhere to modern technology tariffs. Social
          Media and freelancing accounts are the avenues for online personal development, business
          growth, and Return of Investment in the modern digital era. The Market Palace is an
          exclusive website platform offering solutions towards your Social Media Account needs and
          Freelancing Account interests.
        </p>
      </div>
      <div className="aboutData">
        <h1 className="mb-3">Purchasing Social Media Accounts in The Market Palace</h1>
        <p>
          Buying Social Media Account has been made easy through our platform, which assures secure
          transactions using modern payment procedures. For your business, a well-managed social
          media account achieves faster and easier communication with your customers. Using the
          platform to purchase a social media account for your business increases leads to your
          business and with organic traffic you get Returns of Investment. Personal social media
          accounts echo your splendid personality to society. Buy a personal social media account
          and showcase your brand in the online sphere.{' '}
        </p>
      </div>
      <div className="aboutData">
        <h1 className="mb-3">Sell Social Media Accounts in The Market Palace</h1>
        <p>
          The diversity of the platform includes other sellers selling social media accounts through
          our avenue. With the strict terms and conditions of this online market, you can sell your
          social media account to customers across the globe securely. Promoting a range of
          techniques from different social media professionals is a way of achieving the market
          demand in the game.
        </p>
      </div>
      <div className="aboutData">
        <h1 className="mb-3">Buy or Sell Freelancing Accounts from The Market Palace</h1>
        <p>
          Most people prefer to use the word online writing accounts for these particular fields.
          Are you looking for freelancing accounts with a guaranteed reputation in the market? Well,
          at themarketpalace.com, an online jobs enthusiast is exposed to freelancing accounts. Sell
          your freelancing account through our platform and quench the unending demand on the
          market. Through sets of protocols and procedures, we detect the legitimacy of these
          accounts. We guarantee to follow the “dos and don’ts of the trade” to the latter. Our
          customer-friendly and easy-to-use website has a support section for all your questions and
          concerns.
          <Openmail
            label="support@themarketpalace.com"
            mailto="mailto:support@themarketpalace.com"
          />{' '}
          is the one-way ticket to acquiring solutions.
        </p>
      </div>
      <div className="aboutData">
        <h1 className="mb-3">Transaction and Platform Security</h1>
        <p>
          The Market Palace embraces secure money transactions through company policies and
          technologies available in the financial market. Pay for your social media and freelancing
          accounts through M-Pesa, PayPal, bank wire and Bitcoin securely. There are the measures
          that must be followed for financial transactions to be made successfully:
          <ul>
            <li>
              To the vendors using The Market Palace to sell the social media or freelancing
              accounts, an 8% transaction fee is deducted from the selling price during transaction.
            </li>
            <li>
              The platform admin secures the buyers Finances until all the required demands are met
              and thereafter release the account to the buyer and the finances to the seller.
            </li>
          </ul>
          Security at The Market Palace expertise hub is achieved through software engineering
          practices of website development which facilitate fraud detection among the parties
          involved. The governing crew of the platform are all available for any security issue.
          Welcome to a safe online market palace.
        </p>
      </div>
    </>
  );
}
