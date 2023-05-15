# OFMetaStash

## Disclaimer

I am not responseable for loss of data. ALWAYS Back up your Database before running this script.

## Getting started

You will need [Node](https://nodejs.org/en) v20.x.x (May work on lower versions, Just not tested) and [Yarn](https://yarnpkg.com)

This will install and download the dependencies

```bash
mkdir -p ~/scripts && \
cd ~/scripts && \
git clone https://github.com/ServerHeadcase/OFMetaStash.git && \
cd OFMetaStash && \
yarn
```

You will need to copy the sample config file and change the information

```bash
cp config.sample.json config.json && \
nano config.json
```

You can then start the script using

```bash
yarn start
```

## Config

`stash_url`
This is the URL that you use to access your Stash Instance

`ultima_scraper_config`
This is the path to your UltimaScraper Config file

`content_dir`
This is the Path to your content (we use this to scrape the avatar)

`metadata_dir`
This is the path to your metadata

`mappings`
This will map the directories to what you have in stash. Make sure you have equal in both `search` and `replace`

e.g.

```json
{
  "mappings": {
    "search": ["/usr/src/app/.sites/OnlyFans/Profiles"],
    "replace": ["/onlyfans"]
  }
}
```

Will replace the default path (if you ran UltimaScraper in docker) to `/onlyfans` within Stash
