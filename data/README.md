# Tech case

Welcome to PNO's technical case for engineer candidates. We expect you to spend
about 2-4 hours on your solution, which will serve as a base for technical
discussions.

The goal of this case is for you to build an API that exposes a prepared
dataset of trailers and rentals as described below.

### API

For the API we would like to see the following endpoints implemented:

- An endpoint to list rented trailers for a customer, with the option to filter
  on trailer type.
- An endpoint to get a specific rented trailer of a customer.
- An endpoint to list all owned trailers for an owner, with the option to
  search for a VIN.

### Entities of the dataset

The dataset consists of two entities, trailers and rentals.

- **Trailer**: Represents a physical trailer that can be rented. Each trailer
  has a unique ID, an owner ID, a type, and a VIN (vehicle identification
  number).
- **Rental**: Represents a rental contract between a customer and an owner for
  a trailer. Each rental has a unique ID, a customer ID, an asset ID, and a start
  and end date.
  - A customer has rented a trailer if now is between the start and end date of
    rental.

### Language/tools

At PNO we use Go for any backend code, but you're free to use any
language/tools you prefer.

The dataset is provided as two `.json` files, but you can store the data any
way you like for you solution.

To make sure we know how to run your solution, please include instructions on
how to run it in your submission.

### Things we'll discuss

Based on your case we hope to talk through the following points:

- What assumptions did you make?
- Why did you choose this architecture for your solution?
- What other architectures could work for this problem?
- Are there any performance bottlenecks and how could you address them?

After covering the above, we'll let the discussion branch out based on previous
discussion.

### Submission

You should submit your solution as a zip file, including code and instructions,
as described in the email you received.
