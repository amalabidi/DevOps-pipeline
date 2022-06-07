# DevOps-pipeline

This is a CI/CD pipeline done using GitHub Actions, Docker and Amazon ECS.

its workflow consists of 3 jobs :

-Test
-Build
A docker image is built and pushed to Docker Hub
-Deploy
The image is deployed to ECS  and exposed on port 5000.
pipeline:
![image](https://user-images.githubusercontent.com/62261901/172468817-16685a94-e5c2-4722-896e-e496dc2ccb04.png)
