FROM nginx:stable

# Manage certificates
#RUN mkdir /etc/ssl
COPY ./certs/ /etc/ssl

# Only works with real certificates!
RUN cat /etc/ssl/certificate.crt /etc/ssl/ca_bundle.crt >> certificate.crt 

# Run wait for it
COPY wait-for-it.sh wait-for-it.sh
RUN chmod +x wait-for-it.sh 


# Remove any existing config files
RUN rm /etc/nginx/conf.d/*
# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./init.conf /etc/nginx/conf.d/


# Launch NGINX
CMD ["./wait-for-it.sh","nextjs:3000","--strict","--timeout=300", "--", "nginx", "-g", "daemon off;" ]


