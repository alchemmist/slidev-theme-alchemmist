.PHONY: release

all: release

release:
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "🥶 There are uncommitted changes. Commit or stash them first."; \
		exit 1; \
	fi
	pnpm version patch
	pnpm pack
	pnpm publish
	git push --follow-tags

clean:
	rm -rf ./slidev-theme-alchemmist-*.tgz
