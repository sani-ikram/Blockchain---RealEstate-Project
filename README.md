# Blockchain---RealEstate-Project

This Project Zokrates for the data privacy
Intro about Zokrates: 
Succinct Zero-Knowledge proofs (zkSnarks) are proving to be one of the most promising frameworks for enhancing privacy and scalability in the blockchain space.
Projects like Zcash are using zkSnarks to make payments anonymous (rather than pseudonymous). Other projects such as Coda are experimenting with trustless light clients by using recursive zkSnarks to dramatically reduce the number of state verifications blockchain clients have to perform when coming online.
Getting Started with Zokrates
Step 1: Install Docker
Currently, Docker is the recommended way to get started with Zokrates. Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. You can find instructions for installing it here.

Step 2: Run ZoKrates
Run ZoKrates docker container:

docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates /bin/bash

This command breaks out into:

docker run - Run a docker container

-v <path to your project folder>:/home/zokrates/code - Create a host mapped volume inside the container

-it - Connect the container to terminal

zokrates/zokrates - Pull the docker image from here: https://hub.docker.com/r/zokrates/zokrates

/bin/bash - Run /bin/bash in the container

Step 3: A Quick Overview of the ZoKrates Process

In the following zkSNARKs example(s) we shall use the ZoKrates framework.

This is a 5 step process:

Compile Program
Trusted Setup
Compute-Witness
Generate-Proof
Export-Verifier
Input file(s)
program_name.code
Output file(s)
out.code
out
proving.key
verification.key
variables.inf
witness
proof.json
verifier.sol

Step 4: Compile the program written in ZoKrates DSL
  
/path/to/zokrates compile -i <program_name>.code

Step 5: Generate the Trusted Setup
Now take the 'flattened' code, which is a circuit and go through a 'trusted setup' Repeat this process, every-time the program.code changes Two keys are generated - 'proving.key' and 'verification.key'

/path/to/zokrates setup

Step 6: Compute Witness
Having gone through the 'trusted setup' let's compute our 'witness' who knows the answer and it generates a witness file with computation steps

/path/to/zokrates compute-witness -a <a> <b> ... <n>

Step 7: Generate Proof
Next step is to 'generate our proof' based on the above 'witness' A proof.json file is generated in this step

/path/to/zokrates generate-proof

Step 8: Export Verifier
Last but never the least, let's generate our 'verifier' smart contract

path/to/zokrates export-verifier

Commands for project: square.code
The boiler plate code for square.code is provided to help your accelerated learning, you will need to fill out the missing variables before continuing on. Below is a walkthrough of examples so you are able to compare to the outputs to make sure everything is working.

Go through the steps by executing the following commands

docker run -v /path/to/zokrates/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash

zokrates@ec46fd6b5c34:~$
cd code/square

zokrates@ec46fd6b5c34:~/code/square$
~/zokrates compile -i square.code
~/zokrates setup
~/zokrates compute-witness -a 3 9
~/zokrates generate-proof
~/zokrates export-verifier
  
  

