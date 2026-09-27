const CACHE_NAME = "hpl-cache-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./data/exercises.js",
    "./data/storage.js",
    "./manifest.json"
];


self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(cache =>
                    cache.addAll(
                        FILES_TO_CACHE
                    )
                )

        );

        self.skipWaiting();

    }
);


self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(cacheNames =>

                    Promise.all(

                        cacheNames
                            .filter(
                                name =>
                                    name !==
                                    CACHE_NAME
                            )
                            .map(
                                name =>
                                    caches.delete(
                                        name
                                    )
                            )

                    )

                )

        );

        self.clients.claim();

    }
);


self.addEventListener(
    "fetch",
    event => {

        if (
            event.request.method !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            caches
                .match(
                    event.request
                )
                .then(
                    cachedResponse => {

                        if (
                            cachedResponse
                        ) {

                            return cachedResponse;

                        }


                        return fetch(
                            event.request
                        );

                    }
                )

        );

    }
);