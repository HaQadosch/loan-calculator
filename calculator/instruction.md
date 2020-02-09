
# Your mission 🚀

At iwoca, we help small and medium businesses get fast and easy access to loans for their growth.

To achieve this goal, we created 2 loan products for them:

  * A Revolving Credit Facility product **(RCF)** used for small amounts and short terms
  * A Business Loan product **(BL)** used mainly for bigger amounts and longer terms.

The goal of this test is to display a calculator for each product side by side to allow our customers to understand how much they would have to repay for both products.

![1](./loan_calculators.png "Wireframe example (could be used for inspiration, doesn’t need to be exactly the same)")


The customer should be able to act upon 3 parameters:
  
  * The **amount requested** (impacts both calculators at the same time)
  * The **duration** (impacts both calculators at the same time)
  * The **interest rate** (should be calculator dependant).

## How the calculators work 💡

A repayment schedule is composed of monthly rows containing 4 pieces of information:

  * Date of the repayment
  * Loan principal repaid
  * Loan interest repaid
  * Loan total repayment (= principal + interest) for this month.

The last row contains the total for each column.

### RCF repayment calculator example

> Let’s assume that a customer wants to simulate a loan:
> * of £10,000 
> * over 4 months 
> * at a monthly interest rate of 3% 
> * that would start on the 30th of May.
> 
> The repayment schedule would look like:


| Repayment date | Principal | Interest | Total repayment |
| :------------: | :-------: | :------: | :-------------: |
|   30/06/2019   |  £2,500   |   £300   |     £2,800      |
|   30/07/2019   |  £2,500   |   £225   |     £2,725      |
|   30/08/2019   |  £2,500   |   £150   |     £2,650      |
|   30/09/2019   |  £2,500   |   £75    |     £2,575      |
|     Total      |  £10,000  |   £750   |     £10,750     |

The **Principal** column is displaying the total requested loan amount divided equally over the number of selected months (in this case, £10,000 / 4 = £2,500).

The **Interest** column is displaying each month the interest from the total principal remaining at the end of that month, depending on the interest rate:

* Month 1: £10000 (we don’t have repaid anything yet) * 3% = £300,
* Month 2: £7500 (£10000 - £2500 repaid on Month 1) * 3% = £225,
* Month 3: £5000 * 3% = £150,
* Month 4: £2500 * 3% = £75.

### BL repayment calculator example

The BL calculator is really similar to the RCF calculator, it accepts exactly the same parameters, but introduces a new concept, upfront fees, which are 10% of the total amount the customer requests, and should be entirely paid the first month (on top of the interest).

>Let’s assume that a customer wants to simulate a loan
> * of £10000 
> * over 4 months 
> * at a monthly interest rate of 3% 
> * that would start on the 30th of May. 
> 
> The repayment schedule would look like:

| Repayment date | Principal | Interest  | Total repayment |
| :------------: | :-------: | :-------: | :-------------: |
|   30/06/2019   |  £2,500   | **£1300** |   **£3,800**    |
|   30/07/2019   |  £2,500   |   £225    |     £2,725      |
|   30/08/2019   |  £2,500   |   £150    |     £2,650      |
|   30/09/2019   |  £2,500   |    £75    |     £2,575      |
|     Total      |  £10,000  | **£1750** |   **£11,750**   |

The upfront fees in this example are equal to £1000 (10% of £10000), and added to the £300 interest on the first month.

# Bonus task 🎁
_(this part is not mandatory but would be a plus in your application)_

Depending on the amount / duration the customer selects, they may not be able to have one of these products.

The restriction on amount / duration for each product is exposed through an endpoint for both RCF and BL products.

You should now take into account these restrictions to let the customer interact only with the calculators that are compatible with the amount / duration they ask for.

# Evaluation 👮

We want you to spend 4 hours on it. We are aware that’s quite a short amount of time to cover all the requirements, but we want to see how much you can do in 4 hours.

If you'd like to smash this project, here are the skills we will look for you to demonstrate:

  * Maximum number of functionalities developed and working
  * Good practices from used framework/libraries
  * Understanding of separation of concerns
  * Testing knowledge
  * Excellent user experience (UI is responsive, intuitive, simple to use and easy to understand)
  * Talk about your project: technical choices, what could have been done/improved if you had more time, etc. (the README file seems a nice fit for that)

# Technical requirements ✅

  * There are no requirements for the tech stack. Vanilla JavaScript is fine, as is any framework that you feel is appropriate.
  * We will evaluate your efficiency after these 4 hours. Probably not the best time for you to try a new fancy framework/library with a steep learning curve.
  * The source code should be delivered via GitHub (or similar)
  * The project should be deployed online (have a look at [surge.sh](https://surge.sh/), [zeit.co](https://zeit.co/), [netlify.com](https://www.netlify.com/))

