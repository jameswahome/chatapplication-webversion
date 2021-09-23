import React from 'react';
import Faq from 'react-faq-component';

export default function FAQ() {
  const data = {
    title: 'Frequently Asked Questions (FAQ)',
    rows: [
      {
        title: 'Is it legal to Sell/Buy Social Media Accounts?',
        content: `The existing bodies that control Social Media Infrastructures have not banned or rather prohibited the act of purchasing and vending social media avenues.
                However, there are existing terms and conditions in some social media networks that prohibit buying or selling of any account information.  `,
      },
      {
        title: 'Is it legal to sell/buy Freelancing Accounts?',
        content: `Buying or selling a freelancing account is an insecure trade not allowed by nearly all freelancing website domains.
                    However, it is a practice that many people adopt to avoid the hustle of getting clients, reputation requirements, just to name a few. `,
      },
      {
        title: 'How Does Trading Occur on the Website?',
        content: `There are three parties involved in our hub: The social media/ freelancing account buyer who has to pay through the platform for secure transactions, the seller and the administrators. The platform is the intermediary media between the social media/freelancing account vendor and the respective buyer.
                The team of administrators ensures that all the accounts that have been solved to our customers are functional.  NB all transactions must be done within the platform and we shall not be held responsible for any transactions done off site.  `,
      },
      {
        title: 'How to know the legitimacy of the Accounts? ',
        content: `Customer negotiations include knowing the nature of account such as original email (This is the email used when the account was first created). The platform professionals verify the email originality: the buyer and the seller further address account details. `,
      },
      {
        title: 'The Market Palace Customer Support.',
        content: `Incase of any inquires or bugs contact any Administrators or send us an email at support@themarketpalace.com. We will get back to you as soon as we can `,
      },
    ],
  };

  const styles = {
    titleTextColor: 'black',
    rowTitleColor: '#3aaade',
  };

  return (
    <div>
      <h1>The Market Palace</h1>
      <Faq data={data} styles={styles} />
    </div>
  );
}
